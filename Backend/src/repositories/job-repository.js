import CrudRepository from "./crud-repository.js";
import Job from '../models/jobs.js';

class JobRepository extends CrudRepository{
    constructor(){
        super(Job);
    }

    async getByFilter(data, options){
        try {
            const {page, limit} = options;

            if(page && limit){
                const skip = (page-1)*limit;
                const jobs = await Job.find(data).skip(skip).limit(limit);
                const totalCount = await Job.countDocuments(data);
                return {
                    success: true,
                    jobs,
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
                    const jobs = await Job.find(data);
                    return {
                        success: true,
                        jobs,
                        count: jobs.length
                    };
                }
        } catch (error) {
            console.log('Job Repository Error');
            throw error;
        }
    }

    async getMyJobs(id, options = {}) {
        try {
            const { page, limit, title, status } = options;

            const query = { postedBy: id };

            if (title) query.title = { $regex: title, $options: 'i' };
            if (status) query.status = status;

            const jobs = await Job.find(query)
                .skip((page - 1) * limit)
                .limit(limit);

            const totalCount = await Job.countDocuments(query);

            return {
                success: true,
                data : jobs,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / limit),
                    totalItems: totalCount,
                    itemsPerPage: limit,
                    hasNextPage: (page * limit) < totalCount,
                    hasPrevPage: page > 1
                }
            };
        } catch (error) {
            console.log('Job Repository Error');
            throw error;
        }
    }

    async deleteJob(id, userId){
        try {
            const job = await Job.findOneAndDelete({
                _id : id, 
                postedBy : userId
            }, {new : true});
            return job;
        } catch (error) {
            console.log('Job Repository Error');
            throw error;
        }
    }

    async getRecentJobs(limit = 6){
        try {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            const jobs = await Job.find({
                createdAt: { $gte: thirtyDaysAgo }
            })
            .populate('companyId', 'name logo')
            .populate('categoryId', 'name')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));
            
            return jobs;
        } catch (error) {
            console.log('Job Repository Error');
            throw error;
        }
    }

    async getPopularCategories() {
        try{
            const popularCategories = await Job.aggregate([
                { $match: { status: 'Open' } },

                // Group by categoryId and count jobs
                { $group: {
                    _id: "$categoryId",
                    jobCount: { $sum: 1 }
                }},

                // Join with Category collection to get category details
                { $lookup: {
                    from: "categories",        // Category collection name
                    localField: "_id",         // categoryId from grouped result
                    foreignField: "_id",       // _id field in Category collection
                    as: "categoryInfo"
                }},

                // Unwind the category info array
                { $unwind: "$categoryInfo" },

                // Project the final structure
                { $project: {
                    _id: 1,
                    jobCount: 1,
                    categoryName: "$categoryInfo.name",
                }},

                { $sort: { jobCount: -1 } },  // Sort by job count descending
                { $limit: 20 }                // Top 20 popular categories
            ]);

            return popularCategories;
        } catch (error) {
            console.log('getPopularCategories Repository Error');
            throw error;
        }
    }

}

export default JobRepository;