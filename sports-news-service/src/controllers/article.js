import Article from "../models/Article.js";

export const getArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, source } = req.query;
    const query = {};

    // if (category) query.category = category;
    if (source) query.source = source;

    // get articles filtered by category from article.categories array
    if (category) query.categories = { $in: [category] };
    

    const articles = await Article.find(query)
      .sort({ pubDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select({'content': 0});

    const count = await Article.countDocuments(query);

    res.json({
      articles,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArticlesBySearch = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }
    const articles = await Article.find({ $text: { $search: query } });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Article.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSources = async (req, res) => {
  try {
    const sources = await Article.distinct("source");
    res.json(sources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
