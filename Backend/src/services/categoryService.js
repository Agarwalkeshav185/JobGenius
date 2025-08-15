import Category from "../models/category.js";
import Job from "../models/jobs.js";



export const createCategory = async (data) => {
    try{
        return await Category.create(data);
    }
    catch(err){
        throw new Error(err);
    }
    
};

export const getAllCategories = async () => {
    try{
        return await Category.find();
    }
    catch(err){
        throw new Error(err);
    }
};

export const getCategoryById = async (id) => {
    try{
        return await Category.findById(id);
    }
    catch(err){
        throw new Error(err);
    }
};

export const getCategoriesWithActiveJobCount = async () => {
    const result = await Category.aggregate([
        {
            $lookup: {
                from: "jobs",
                let: { categoryId: "$_id" },
                pipeline: [
                    { $match: { $expr: { $and: [
                        { $eq: ["$category", "$$categoryId"] },
                        { $eq: ["$is_active", true] }
                    ]}}},
                ],
                as: "activeJobs"
            }
        },
        {
            $addFields: {
                jobCount: { $size: "$activeJobs" }
            }
        },
        {
            $project: {
                _id: 1,
                icon: 1,
                name: 1,
                jobCount: 1
            }
        }
    ]);
    return result;
};

export const updateCategory = async (id, data) => {
    try{
        return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    catch(err){
        throw new Error(err);
    }
};

export const deleteCategory = async (id) => {
    try{
        return await Category.findByIdAndDelete(id);
    }
    catch(err){
        throw new Error(err);
    }
};