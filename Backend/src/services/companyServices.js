import Company from "../models/company.js";
import { ErrorHandler } from "../middlewares/error-middlewares.js";
import Category from "../models/category.js";
import mongoose from "mongoose";

export const createCompany = async (data) => {
    try {
        if (data.category) {
            const category = await Category.findOne({ 
                name: { $regex: `^${data.category}$`, $options: "i" } });
            data.category = category ? category._id : null;
        }
        return await Company.create(data);
    } catch (err) {
        throw new ErrorHandler(err.message, 400);
    }
};

export const getAllCompanies = async () => {
    try {
        return await Company.find();
    } catch (err) {
        throw new ErrorHandler(err.message, 500);
    }
};

export const getCompanyById = async (id) => {
    try {
        id = new mongoose.Types.ObjectId(id);
        const company = await Company.findById(id).populate('category','name');
        if (!company) throw new ErrorHandler("Company not found", 404);
        return company;
    } catch (err) {
        throw new ErrorHandler(err.message, err.statusCode || 500);
    }
};

export const updateCompany = async (id, data) => {
    try {
        const company = await Company.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!company) throw new ErrorHandler("Company not found", 404);
        return company;
    } catch (err) {
        throw new ErrorHandler(err.message, err.statusCode || 400);
    }
};

export const deleteCompany = async (id) => {
    try {
        const company = await Company.findByIdAndDelete(id);
        if (!company) throw new ErrorHandler("Company not found", 404);
        return company;
    } catch (err) {
        throw new ErrorHandler(err.message, err.statusCode || 500);
    }
};