import express from "express";
import isAuth from "../middleware/is-auth.js";
import { body } from "express-validator";
import Source from "../models/Source.js";
import * as sourceController from "../controllers/source.js";

const router = express.Router();

/**
 * @openapi
 * /api/sources:
 *   get:
 *     tags:
 *       - sources
 *     summary: Get all sources
 *     description: Get all sources
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
router.get("/", sourceController.getSources);

/**
 * @openapi
 * /api/sources/{id}:
 *   get:
 *     tags:
 *       - sources
 *     summary: Get source by ID
 *     description: Get source by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the source
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
router.get("/:id", sourceController.getSourceById);

/**
 * @openapi
 * /api/sources:
 *   post:
 *     tags:
 *       - sources
 *     summary: Create a new source
 *     description: Create a new source
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: A successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  isAuth,
  [
    body("name").trim().isLength({ min: 3 }),
    body("url").trim().isURL(),
  ],
  sourceController.createSource
);

/**
 * @openapi
 * /api/sources/{id}:
 *   put:
 *     tags:
 *       - sources
 *     summary: Update source by ID
 *     description: Update source by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the source
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
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
  [
    body("name").trim().isLength({ min: 3 }),
    body("url").trim().isURL(),
  ],
  sourceController.updateSource
);

/**
 * @openapi
 * /api/sources/{id}:
 *   delete:
 *     tags:
 *       - sources
 *     summary: Delete source by ID
 *     description: Delete source by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the source
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
router.delete("/:id", isAuth, sourceController.deleteSource);

/**
 * @openapi
 * /api/sources/start:
 *   post:
 *     tags:
 *       - sources
 *     summary: Start service
 *     description: Start service
 *     responses:
 *       200:
 *         description: A successful response
 *       500:
 *         description: Internal server error
 */
router.post("/parse", isAuth, sourceController.startService);

/**
 * @openapi
 * /api/sources/stop:
 *   post:
 *     tags:
 *       - sources
 *     summary: Stop service
 *     description: Stop service
 *     responses:
 *       200:
 *         description: A successful response
 *       500:
 *         description: Internal server error
 */
router.post("/stop", isAuth, sourceController.stopService);

export default router;

