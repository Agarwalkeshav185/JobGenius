import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    searchCategories,
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
        const { page, limit } = req.query;
        const options = {};
        
        // Only add pagination if both page and limit are provided
        if (page && limit) {
            options.page = parseInt(page);
            options.limit = parseInt(limit);
        }
        const categories = await getCategoriesWithActiveJobCount(options);
        res.status(200).json(
            categories
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const searcHCategories = async (req, res) => {
    try {
        const { query, page, limit } = req.query;
        const options = {};

        // Only add pagination if both page and limit are provided
        if (page && limit) {
            options.page = parseInt(page);
            options.limit = parseInt(limit);
        }
        const categories = await searchCategories(query, options);
        console.log(categories);
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};