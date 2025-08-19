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
    
}

export default JobRepository;