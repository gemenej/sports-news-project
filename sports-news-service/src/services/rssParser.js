import Parser from "rss-parser";
import Article from "../models/Article.js";
import Source from "../models/Source.js";
import Category from "../models/Category.js";
import * as webParser from "../services/webParser.js";
import * as logger from "./logger.js";
import CyrillicToTranslit from 'cyrillic-to-translit-js';

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "media"],
      ["content:encoded", "content"],
      ["description", "description"],
      ["enclosure", "enclosure"],
    ],
  },
});

const cyrillicToTranslit = new CyrillicToTranslit();

// get List of RSS feeds to fetch from mongoDB using mongoose
export const getRssFeeds = async () => {
  return await Source.find({});
};

// Enhanced error handling and logging for RSS parsing
export const fetchAndSaveNews = async () => {
  const failedFeeds = [];

  try {
    const RSS_FEEDS = await getRssFeeds();
    for (const feed of RSS_FEEDS) {
      try {
        logger.logInfo(`Fetching news from ${feed.source}...`);
        const feedData = await parser.parseURL(feed.url);

        for (const item of feedData.items) {
          logger.logInfo(`item.link: ${item.link}`);

          if (!item.link) {
            logger.logInfo(`Skipping item without link: ${item.title}`);
            continue;
          }

          if (feed.wrapper) {
            const content = await webParser
              .getWebPageContent(item.link, feed.wrapper, feed.selector)
              .then((response) => {
                item.content = response;
              })
              .catch((error) => {
                logger.logError(`\nError fetching content from ${item.link}: ${error}`);
              });
          }

          let title;
          switch (true) {
            case !!item.title:
              title = formatText(item.title);
              break;
            case !!item["title"]:
              title = formatText(item["title"]);
              break;
            case !!item["title:encoded"]:
              title = formatText(item["title:encoded"]);
              break;
            case !!item["description"]:
              title = formatText(item["description"]);
              break;
            default:
              title = null;
          }

          let description;
          switch (true) {
            case !!item.description:
              description = formatText(item.description);
              break;
            case !!item.summary:
              description = formatText(item.summary);
              break;
            case !!item.content:
              description = formatText(getFirst20Words(item.content));
              break;
            case !!item["content:encoded"]:
              description = formatText(getFirst20Words(item["content:encoded"]));
              break;
            default:
              description = null;
          }

          let content;
          switch (true) {
            case !!item.content:
              content = removeImgTags(item.content);
              break;
            case !!item["content:encoded"]:
              content = removeImgTags(item["content:encoded"]);
              break;
            case !!item["fulltext"]:
              content = removeImgTags(item["fulltext"]);
              break;
            case !!item["full-text"]:
              content = removeImgTags(item["full-text"]);
              break;
            default:
              content = null;
          }

          const arrayCategories = [];
          if (item.categories) {
            await Promise.all(item.categories.map(async (category) => {
              const newCategory = await compareCategory(category);
              arrayCategories.push(newCategory);
            }));
          }

          const article = {
            title: title,
            description: description,
            content: content,
            pubDate: new Date(item.pubDate),
            link: item.link,
            source: feed.source,
            category: feed.category,
            categories: arrayCategories,
            imageUrl: extractImageUrl(item),
          };

          await Article.findOneAndUpdate({ link: article.link }, article, {
            upsert: true,
            new: true,
          });
        }
        logger.logInfo(`Successfully updated articles from ${feed.source}`);
      } catch (feedError) {
        failedFeeds.push({
          source: feed.source,
          url: feed.url,
          error: feedError.message,
        });
        console.error(`Error fetching from ${feed.source}:`, feedError);
        logger.logError(`Error fetching from ${feed.source}: ${feedError}`);
      }
    }

    if (failedFeeds.length > 0) {
      console.warn("Some feeds failed to fetch:", failedFeeds);
      logger.logFeedError(`Some feeds failed to fetch: ${failedFeeds}`);
    }

    return {
      success: true,
      failedFeeds: failedFeeds,
    };
  } catch (error) {
    console.error("Critical error in fetchAndSaveNews:", error);
    logger.logError(`Critical error in fetchAndSaveNews: ${error}`);
    throw error;
  }
};

// Helper for comparing category and creating new one if it doesn't exist
const compareCategory = async (category) => {
  const existingCategory = await Category.findOne({ name: category });
  if (!existingCategory) {
    const newCategory = new Category({ name: category, slug: createSlug(category) });
    const savedCategory = await newCategory.save();
    return savedCategory.slug;
  } else {
    return existingCategory.slug;
  }
};


// Helper for creating latin slug from the simple cirylic string
export const createSlug = (string) => {
  return cyrillicToTranslit.transform(string, "_").toLowerCase();
};

// Helper function to extract image URL from various RSS formats
const extractImageUrl = (item) => {
  if (item.media && item.media.$) return item.media.$.url;
  if (item.enclosure && item.enclosure.url) return item.enclosure.url;
  if (item["media:content"] && item["media:content"].$.url)
    return item["media:content"].$.url;

  // Try to find image URL in content
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  if (item.content) {
    const match = item.content.match(imgRegex);
    if (match) return match[1];
  }

  return null;
};

const getFirst20Words = (text) => {
  return text.split(" ").slice(0, 20).join(" ");
}

const removeImgTags = (text) => {
  return text.replace(/<img[^>]*>/g, "");
}

const formatText = (text) => {
  if (!text) return null;

  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, "");

  // Remove links
  text = text.replace(/http(s)?:\/\/\S+/g, "");

  // Replace special characters
  text = text.replace(/&amp;/g, "&");

  // Replace special characters
  text = text.replace(/&#8217;/g, "'");

  // Replace special characters
  text = text.replace(/&#8211;/g, "-");

  // Replace special characters
  text = text.replace(/&#8220;/g, '"');

  // Replace special characters
  text = text.replace(/&#8221;/g, '"');

  // Replace special characters
  text = text.replace(/&#8230;/g, "...");

  // Replace special characters
  text = text.replace(/&#8216;/g, "'");

  // Replace special characters
  text = text.replace(/&#038;/g, "&");

  // Replace special characters
  text = text.replace(/&#8212;/g, "--");

  // Replace special characters
  text = text.replace(/&#8218;/g, ",");

  return text.trim();
};

// Add function to get available categories
export const getAvailableCategories = () => {
  return [...new Set(RSS_FEEDS.map((feed) => feed.category))];
};

// Add function to get available sources
export const getAvailableSources = () => {
  return [...new Set(RSS_FEEDS.map((feed) => feed.source))];
};
