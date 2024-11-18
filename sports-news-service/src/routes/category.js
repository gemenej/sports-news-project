import express from "express";
import isAuth from "../middleware/is-auth.js";
import { body } from "express-validator";
import category from "../models/Category.js";
import * as categoryController from "../controllers/category.js";

//const categoryController = category;

const router = express.Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags:
 *       - categories
 *     summary: Get all categories
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/", categoryController.getCategories);

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     tags:
 *       - categories
 *     summary: Get category by ID
 *     description: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", categoryController.getCategoryById);

/**
 * @openapi
 * /api/categories:
 *   post:
 *     tags:
 *       - categories
 *     summary: Create a new category
 *     description: Create a new category
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  isAuth,
  [body("name").trim().isLength({ min: 3 })],
  categoryController.createCategory
);

/**
 * @openapi
 * /api/categories/{id}:
 *   put:
 *     tags:
 *       - categories
 *     summary: Update category by ID
 *     description: Update category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  isAuth,
  [body("name").trim().isLength({ min: 3 })],
  categoryController.updateCategory
);

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     tags:
 *       - categories
 *     summary: Delete category by ID
 *     description: Delete category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", isAuth, categoryController.deleteCategory);

export default router;
