import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const count = await Category.countDocuments();
    res.json({
      categories,
      totalItems: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    category.set(req.body);
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

