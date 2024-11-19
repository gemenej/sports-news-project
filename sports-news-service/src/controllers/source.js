import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Source from "../models/Source.js";
import Settings from "../models/Settings.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import { fetchAndSaveNews } from "../services/rssParser.js";
import * as logger from "../services/logger.js";

dotenv.config();

export const getSources = async (req, res) => {
  try {
    const sources = await Source.find();
    res.json(sources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSourceById = async (req, res) => {
  try {
    const source = await Source.findById(req.params.id);
    res.json(source);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSource = async (req, res) => {
  try {
    const params = req.body;
    params.source = params.name;
    const source = new Source(params);
    await source.save();
    res.status(201).json(source);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSource = async (req, res) => {
  try {
    const source = await Source.findById(req.params.id);
    source.set(req.body);
    await source.save();
    res.json(source);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSource = async (req, res) => {
  try {
    await Source.findByIdAndDelete(req.params.id);
    res.json({ message: "Source deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let newsFetchInterval;

export const startService = async (req, res) => {
  try {
    const settings = await Settings.findOne({ service: "parse" });
    if (!settings) {
      const newSettings = new Settings({ service: "parse", status: true });
      await newSettings.save();
    } else {
      settings.set({ status: true });
      await settings.save();
    }
    logger.logInfo(
      `Settings of service ${settings.service} has updated to status ${settings.status}`
    );
    // Schedule news fetching (every 1 hour)
    newsFetchInterval = setInterval(fetchAndSaveNews, process.env.PERIOD_MIN * 60 * 1000);
    // Initial fetch
    fetchAndSaveNews();
    logger.logInfo("Service started successfully!");
    res.json({ message: "Service started successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const stopService = async (req, res) => {
  try {
    const settings = await Settings.findOne({ service: "parse" });
    if (!settings) {
      const newSettings = new Settings({ service: "parse", status: false });
      await newSettings.save();
    } else {
      settings.set({ status: false });
      await settings.save();
    }
    if (newsFetchInterval) {
      // Stop news fetching
      clearInterval(newsFetchInterval);
      newsFetchInterval = null;
    }
    logger.logInfo(
      `Settings of service ${settings.service} has updated to status ${settings.status}`
    );
    logger.logInfo("Service stopped successfully!");
    res.json({ message: "Service stopped successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSettingsByService = async (req, res) => {
  try {
    const settings = await Settings.findOne({ service: "parse" });
    if (!settings) {
      logger.logError("Settings not found");
      return res.status(404).json({ message: "Settings not found" });
    }
    logger.logInfo(
      `Settings found: service ${settings.service} with status ${settings.status}`
    );
    res.json(settings);
  } catch (error) {
    logger.logError(`Error occurred: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const setDefaultSettings = async (req, res) => {
  try {
    await initializeDatabase();
    res
      .status(200)
      .json({ message: "Default settings initialized successfully" });
  } catch (error) {
    logger.logError(`Error updating settings: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const initializeDatabase = async () => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { service: "parse" },
      { service: "parse", status: false },
      { upsert: true, new: true }
    );
    logger.logInfo(
      `Settings updated successfully with status: ${settings.status}`
    );

    const hashedPassword = await bcrypt.hash("root", 12);
    const user = await User.findOneAndUpdate(
      { email: "admin@localhost.com" },
      { name: "admin", email: "admin@localhost.com", password: hashedPassword },
      { upsert: true, new: true }
    );
    logger.logInfo(`User updated successfully with email: ${user.email}`);

    const category = await Category.findOneAndUpdate(
      { slug: "general" },
      { name: "Спорт", slug: "general" },
      { upsert: true, new: true }
    );
    logger.logInfo(`Category updated successfully with slug: ${category.slug}`);

    const source = await Source.findOneAndUpdate(
      { slug: "chempion" },
      {
        name: "Чемпіон",
        slug: "chempion",
        source: "Чемпіон",
        url: "https://champion.com.ua/ukr/rss/",
        category: "general",
        wrapper: ".post_news_text",
        selector: {
          selector: "p",
          attribute: "",
          value: "",
        },
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    logger.logError(`Error initializing database: ${error}`);
    throw error;
  }
};
