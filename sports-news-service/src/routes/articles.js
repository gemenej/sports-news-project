import express from "express";
import Article from "../models/Article.js";
import * as article from "../controllers/article.js";
import isAuth from "../middleware/is-auth.js";

const articleController = article;

const router = express.Router();

// Get all articles with pagination and filtering
/** GET Method */
/**
 * @openapi
 * '/api/articles':
 *  get:
 *     tags:
 *     - article
 *     summary: Get all articles with pagination and filtering
 *     parameters:
 *      - name: page
 *        in: query
 *        description: The page number
 *        required: false
 *        schema:
 *          type: integer
 *      - name: limit
 *        in: query
 *        description: The number of articles per page
 *        required: false
 *        schema:
 *          type: integer
 *      - name: category
 *        in: query
 *        description: The category of the article
 *        required: false
 *        schema:
 *          type: string
 *      - name: source
 *        in: query
 *        description: The source of the article
 *        required: false
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                articles:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                      title:
 *                        type: string
 *                      description:
 *                        type: string
 *                      content:
 *                        type: string
 *                      pubDate:
 *                        type: string
 *                        format: date-time
 *                      link:
 *                        type: string
 *                      source:
 *                        type: string
 *                      category:
 *                        type: string
 *                      imageUrl:
 *                        type: string
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                totalPages:
 *                  type: integer
 *                currentPage:
 *                  type: integer
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
router.get("/", articleController.getArticles);

/** GET Method */
/**
 * @openapi
 * '/api/articles/search':
 *  get:
 *     tags:
 *     - article
 *     summary: Find articles by search query
 *     parameters:
 *     - name: query
 *       in: query
 *       description: The search query
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   content:
 *                     type: string
 *                   pubDate:
 *                     type: string
 *                     format: date-time
 *                   link:
 *                     type: string
 *                   source:
 *                     type: string
 *                   category:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/search", articleController.getArticlesBySearch);
// this find method is used to search the articles by query on postman in this way:
// http://localhost:3000/api/articles/search?query=football


// Get available categories
/** GET Method */
/**
 * @openapi
 * '/api/articles/categories':
 *   get:
 *     tags:
 *       - article
 *     summary: Get available categories
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/categories", articleController.getCategories);

// Get available sources
/** GET Method */
/**
 * @openapi
 * '/api/articles/sources':
 *   get:
 *     tags:
 *       - article
 *     summary: Get available sources
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/sources", articleController.getSources);

// Get article by ID
/** GET Methods */
/**
 * @openapi
 * '/api/articles/{id}':
 *  get:
 *     tags:
 *     - article
 *     summary: Get article by ID
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the article
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                content:
 *                  type: string
 *                pubDate:
 *                  type: string
 *                  format: date-time
 *                link:
 *                  type: string
 *                source:
 *                  type: string
 *                category:
 *                  type: string
 *                imageUrl:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
router.get("/:id", articleController.getArticleById);

// Remove article by ID
/** DELETE Method */
/**
 * @openapi
 * '/api/articles/{id}':
 *  delete:
 *     tags:
 *     - article
 *     summary: Remove article by ID
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the article
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Article deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
router.delete("/:id", isAuth, async (req, res) => {
  try {
    const article = await Article.findByIdAndRemove(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update article by ID with rest method PATCH
/** PATCH Method */
/**
 * @openapi
 * '/api/articles/{id}':
 *  patch:
 *     tags:
 *     - article
 *     summary: Update article by ID
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the article
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               pubDate:
 *                 type: string
 *                 format: date-time
 *               link:
 *                 type: string
 *               source:
 *                 type: string
 *               category:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *      200:
 *        description: Updated Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                content:
 *                  type: string
 *                pubDate:
 *                  type: string
 *                  format: date-time
 *                link:
 *                  type: string
 *                source:
 *                  type: string
 *                category:
 *                  type: string
 *                imageUrl:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
router.patch("/:id", isAuth, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new article with rest method POST
/** POST Method */
/**
 * @openapi
 * '/api/articles':
 *  post:
 *     tags:
 *     - article
 *     summary: Create new article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               pubDate:
 *                 type: string
 *                 format: date-time
 *               link:
 *                 type: string
 *               source:
 *                 type: string
 *               category:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *      200:
 *        description: Created Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                content:
 *                  type: string
 *                pubDate:
 *                  type: string
 *                  format: date-time
 *                link:
 *                  type: string
 *                source:
 *                  type: string
 *                category:
 *                  type: string
 *                imageUrl:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
router.post("/", isAuth, async (req, res) => {
  try {
    const article = new Article(req.body);
    const savedArticle = await article.save();
    res.json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
