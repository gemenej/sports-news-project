import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import bodyParser from "body-parser";

import settingsRouter from "./routes/settings.js";
import articlesRouter from "./routes/articles.js";
import sourcesRouter from "./routes/source.js";
import categoriesRouter from "./routes/category.js";
import authRouter from "./routes/auth.js";

import { initializeDatabase } from './controllers/source.js';
import swaggerDocs from "../swagger.js";

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


app.listen(PORT, async () => {
  try {
    await initializeDatabase();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error(`Error initializing database: ${error.message}`);
  }
});
swaggerDocs(app, PORT);
