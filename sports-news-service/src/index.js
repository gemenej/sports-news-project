import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import csrf from "csurf";
import mongoose, { set } from "mongoose";
import bodyParser from "body-parser";

import settingsRouter from "./routes/settings.js";
import articlesRouter from "./routes/articles.js";
import sourcesRouter from "./routes/source.js";
import categoriesRouter from "./routes/category.js";
import authRouter from "./routes/auth.js";

import swaggerDocs from "../swagger.js";
import { fetchAndSaveNews } from "./services/rssParser.js";
import Settings from "./models/Settings.js";
import * as logger from "./services/logger.js";
import { setDefaultSettings } from "./controllers/source.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use("/api/settings", settingsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/sources", sourcesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", authRouter);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

connectDB();


app.listen(PORT, () => {
  setDefaultSettings();
  console.log(`Server running on port ${PORT}`);
});
swaggerDocs(app, PORT);
