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

export const getAllCategories = async (options = {}) => {
    try {
        if (options.page && options.limit) {
            // Pagination requested
            const page = options.page;
            const limit = options.limit;
            const skip = (page - 1) * limit;
            
            const totalCategories = await Category.countDocuments();
            const categories = await Category.find()
                .skip(skip)
                .limit(limit)
                .sort({ name: 1 }); // Sort by name alphabetically
                
            const totalPages = Math.ceil(totalCategories / limit);
            
            return {
                success: true,
                categories,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: totalCategories,
                    itemsPerPage: limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            };
        } else {
            // No pagination - return all categories
            const categories = await Category.find().sort({ name: 1 });
            return {
                success: true,
                data: categories,
                count: categories.length
            };
        }
    } catch (err) {
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