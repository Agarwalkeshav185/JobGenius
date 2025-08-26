import CrudRepository from "./crud-repository.js";
import Job from '../models/jobs.js';

class JobRepository extends CrudRepository{
    constructor(){
        super(Job);
    }

    async getByFilter(data){
        try {
            const job = await Job.find(data);
            return job;
        } catch (error) {
            console.log('Job Repository Error');
            throw error;
        }
    }

    async getMyJobs(id){
        try {
            const job = await Job.find({postedBy : id});
            return job;
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

    async getJobsByStatus(status, page, limit) {
        try {
            const skip = (page-1)*limit;
            const jobs = await Job.find({ status: status }).skip(skip).limit(limit);
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
                { $limit: 10 }                // Top 10 popular categories
            ]);

            return popularCategories;
        } catch (error) {
            console.log('getPopularCategories Repository Error');
            throw error;
        }
    }

}

export default JobRepository;