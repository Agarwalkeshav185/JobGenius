import { ErrorHandler } from '../middlewares/error-middlewares.js';
import JobRepository from '../repositories/job-repository.js';
import Company from '../models/company.js';
import Category from '../models/category.js';

class JobService {
    constructor() {
        this.jobRepository = new JobRepository();
    }

    async postJob(data) {
        try {
            const company = await Company.findOne({
                name: { $regex: `^${data.companyName}$`, $options: "i" }
            });
            if(!company){
                throw new ErrorHandler('Company not found.', 404);
            }
            data.companyId = company._id;

            const category = await Category.findOne({
                name: { $regex: `^${data.categoryName}$`, $options: "i" }
            });
            if(!category){
                throw new ErrorHandler('Category not found.', 404);
            }
            data.categoryId = category._id;
            
            const job = await this.jobRepository.create(data);
            return job;
        } catch (error) {
            console.log('PostJob Service Error.');
            throw error;
        }
    }

    async getAllJobs(data) {
        try {
            const {
                jobType,
                city,
                jobNiche,
                searchKeyword,
                categoryId,
                companyId
            } = data;

            const query = {};
            if (jobType) query.jobType = jobType;
            if (city) query.location = { $regex: city, $options: 'i' };
            if (jobNiche) query.jobNiche = { $regex: jobNiche, $options: 'i' };
            if (categoryId) query.categoryId = categoryId;
            if (companyId) query.companyId = companyId;
            if (searchKeyword) query.$or = [
                { title: { $regex: searchKeyword, $options: 'i' } },
                { companyName: { $regex: searchKeyword, $options: 'i' } },
                { introduction: { $regex: searchKeyword, $options: 'i' } }
            ];

            const jobs = await this.jobRepository.getByFilter(query);
            return jobs;
        } catch (error) {
            console.log('getAllJobs Service Error.');
            throw error;
        }
    }

    async getMyJobs(id) {
        try {
            const jobs = await this.jobRepository.getMyJobs(id);
            return jobs;
        } catch (error) {
            console.log('getMyJobs Service Error.');
            throw error;
        }
    }

    async deleteJob(id, userId) {
        try {
            const deletedJob = await this.jobRepository.deleteJob(id, userId);
            if (!deletedJob) {
                throw new ErrorHandler('Oops! Job not found.', 404);
            }
            return deletedJob;
        } catch (error) {
            console.log('DeleteJob Service Error.');
            throw error;
        }
    }

    async getASingleJob(id) {
        try {
            const job = await this.jobRepository.get(id);
            if (!job) {
                throw new ErrorHandler('Job not found.', 404);
            }
            return job;
        } catch (error) {
            console.log('getASingleJob Service Error.');
            throw error;
        }
    }

    async getRecentJobs(limit = 6) {
        try {
            const jobs = await this.jobRepository.getRecentJobs(limit);
            if (!jobs || jobs.length === 0) {
                throw new ErrorHandler('No recent jobs found.', 404);
            }
            return jobs;
        } catch (error) {
            console.log('getRecentJobs Service Error.');
            throw error;
        }
    }
}

export default JobService;