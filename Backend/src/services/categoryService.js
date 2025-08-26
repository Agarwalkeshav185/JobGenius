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

export const getCategoriesWithActiveJobCount = async (options = {}) => {
    try {
        const { page, limit } = options;
        
        // Base aggregation pipeline
        const pipeline = [
            {
                $lookup: {
                    from: "jobs",
                    let: { categoryId: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $and: [
                            { $eq: ["$categoryId", "$$categoryId"] },
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
            },
            { $sort: { jobCount: -1 } } // Sort by job count descending
        ];

        if (page && limit) {
            // Add pagination using $facet to get both data and count in single query
            pipeline.push({
                $facet: {
                    data: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            });

            const result = await Category.aggregate(pipeline);
            const categories = result[0].data;
            const totalCount = result[0].totalCount[0]?.count || 0;
            const totalPages = Math.ceil(totalCount / limit);

            return {
                success: true,
                data: categories,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: totalCount,
                    itemsPerPage: limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            };
        } else {
            // No pagination - return all categories but limit to 50 for scalability
            pipeline.push({ $limit: 50 });
            const categories = await Category.aggregate(pipeline);
            
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

export const searchCategories = async (search, options = {})=>{
    try{
        const { page, limit } = options;
        const query = {
            $or: [
                { name: { $regex: search, $options: "i" } }
            ]
        };
        if (page && limit) {
            const categories = await Category.find(query)
                .skip((page - 1) * limit)
                .limit(limit);
            const totalCount = await Category.countDocuments(query);
            return {
                success: true,
                data: categories,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / limit),
                    totalItems: totalCount,
                    itemsPerPage: limit,
                    hasNextPage: (page * limit) < totalCount,
                    hasPrevPage: page > 1
                }
            };
        } else {
            const categories = await Category.find(query);
            return {
                success: true,
                data: categories,
                count: categories.length
            };
        }
    }
    catch(err){
        throw new Error(err);
    }
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