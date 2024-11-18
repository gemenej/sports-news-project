import express from "express";
import isAuth from "../middleware/is-auth.js";
import { body } from "express-validator";
import Source from "../models/Source.js";
import Settings from "../models/Settings.js";
import * as sourceController from "../controllers/source.js";
import e from "express";

const router = express.Router();

/**
 * @openapi
 * /api/settings:
 *   get:
 *     tags:
 *       - settings
 *     summary: Get all settings
 *     description: Get all settings
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

router.get("/", isAuth, sourceController.getSettingsByService);

export default router;