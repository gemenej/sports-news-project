import mongoose from "mongoose";
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  content: String,
  pubDate: Date,
  link: {
    type: String,
    required: true,
    unique: true,
  },
  source: String,
  category: String,
  categories: {
    type: [String],
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexing the title and content fields for full-text search
articleSchema.index({ title: 'text', content: 'text' });

export default mongoose.model("Article", articleSchema);
