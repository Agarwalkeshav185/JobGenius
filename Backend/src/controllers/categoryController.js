import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getCategoriesWithActiveJobCount
} from "../services/categoryService.js";

export const create = async (req, res) => {
    try {
        const category = await createCategory(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await getAllCategories({
            page: parseInt(page),
            limit: parseInt(limit)
        });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getById = async (req, res) => {
    try {
        const category = await getCategoryById(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const category = await updateCategory(req.params.id, req.body);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const remove = async (req, res) => {
    try {
        const category = await deleteCategory(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllWithActiveJobCount = async (req, res) => {
    try {
        const categories = await getCategoriesWithActiveJobCount();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};