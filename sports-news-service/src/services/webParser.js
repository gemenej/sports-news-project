import axios from "axios";
import * as cheerio from "cheerio";

export const getWebPage = async (url) => {
  return await axios.get(url);
};

export const getWebPageContent = async (url, wrapper, selector) => {    
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const article = $(wrapper);
    const pTagsContent = article.find(selector.selector).map((i, el) => $(el).toString()).get().join('');
    return pTagsContent;
};

export const getWebPageContentWithSelectors = async (
  url,
  wrapper,
  selector
) => {
  const response = await axios.get(url);
  return response.data;
};

export const getWebPageContentWithSelectorAndAttribute = async (
  url,
  selector,
  attribute
) => {
  const response = await axios.get(url);
  return response.data;
};

export const getWebPageContentWithSelectorAndAttributeAndValue = async (
  url,
  selector,
  attribute,
  value
) => {
  const response = await axios.get(url);
  return response.data;
};

