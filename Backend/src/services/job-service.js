import mongoose from 'mongoose'; 
import { ErrorHandler } from '../middlewares/error-middlewares.js';
import JobRepository from '../repositories/job-repository.js';
import Company from '../models/company.js';
import Category from '../models/category.js';

class JobService {
    constructor() {
        this.jobRepository = new JobRepository();
    }

    async postJob(data, userId) {
        try {
            if(!data.companyId && data.companyName){
                const company = await Company.findOne({
                    name: { $regex: `^${data.companyName}$`, $options: "i" }
                });
                if(!company){
                    throw new ErrorHandler('Company not found.', 404);
                }
                data.companyId = new mongoose.Types.ObjectId(company._id);
            } else if(data.companyId) {
                // Convert existing companyId to ObjectId if it's a string
                data.companyId = new mongoose.Types.ObjectId(data.companyId);
            }

            // Handle category lookup
            if(!data.categoryId && data.categoryName){
                const category = await Category.findOne({
                    name: { $regex: `^${data.categoryName}$`, $options: "i" }
                });
                if(!category){
                    throw new ErrorHandler('Category not found.', 404);
                }
                data.categoryId = new mongoose.Types.ObjectId(category._id);
            } else if(data.categoryId) {
                data.categoryId = new mongoose.Types.ObjectId(data.categoryId);
            }

            data.postedBy = new mongoose.Types.ObjectId(userId);

            // Remove the name fields since we now have IDs
            delete data.companyName;
            delete data.categoryName;
            
            const job = await this.jobRepository.create(data);
            return job;
        } catch (error) {
            console.log('PostJob Service Error:', error.message);
            throw error;
        }
    }

    async getAllJobs(data, options = {}) {
        try {
            const {
                jobType,        // Can be array or string
                city,
                searchKeyword,
                categoryId,
                companyId,
                title,          
                status,         
                experienceLevel, // Can be array or string
                minSalary,      // Number
                maxSalary       // Number
            } = data;
            const {page, limit} = options;

            const query = {};

            // Handle jobType as array or single value
            if (jobType) {
                if (Array.isArray(jobType) && jobType.length > 0) {
                    query.jobType = { $in: jobType };
                } else if (typeof jobType === 'string' && jobType.trim()) {
                    query.jobType = jobType.trim();
                }
            }

            // Handle experienceLevel as array or single value
            if (experienceLevel) {
                if (Array.isArray(experienceLevel) && experienceLevel.length > 0) {
                    query.experienceLevel = { $in: experienceLevel };
                } else if (typeof experienceLevel === 'string' && experienceLevel.trim()) {
                    query.experienceLevel = experienceLevel.trim();
                }
            }

            if (status) {
                if (Array.isArray(status) && status.length > 0) {
                    query.status = { $in: status };
                } else if (typeof status === 'string' && status.trim()) {
                    query.status = status.trim();
                }
            } else {
                query.status = 'Open';
            }

            const salaryConditions = [];
            
            if (minSalary !== undefined && minSalary !== null && minSalary >= 0) {
                salaryConditions.push({
                    $or: [
                        { minSalary: { $gte: minSalary } },
                        { maxSalary: { $gte: minSalary } }
                    ]
                });
            }

            if (maxSalary !== undefined && maxSalary !== null && maxSalary > 0) {
                salaryConditions.push({
                    $or: [
                        { maxSalary: { $lte: maxSalary } },
                        { minSalary: { $lte: maxSalary } }
                    ]
                });
            }

            // Add salary conditions to main query
            if (salaryConditions.length > 0) {
                query.$and = query.$and ? [...query.$and, ...salaryConditions] : salaryConditions;
            }

            if (city) query.location = { $regex: city, $options: 'i' };
            
            if (title && title.trim()) {
                query.title = { $regex: title.trim(), $options: 'i' };
            }

            // Handle categoryId
            if (categoryId) {
                if (Array.isArray(categoryId) && categoryId.length > 0) {
                    query.categoryId = { $in: categoryId.map(id => new mongoose.Types.ObjectId(id)) };
                } else if (categoryId) {
                    query.categoryId = new mongoose.Types.ObjectId(categoryId);
                }
            }

            // Handle companyId
            if (companyId) {
                if (Array.isArray(companyId) && companyId.length > 0) {
                    query.companyId = { $in: companyId.map(id => new mongoose.Types.ObjectId(id)) };
                } else if (companyId) {
                    query.companyId = new mongoose.Types.ObjectId(companyId);
                }
            }

            // Search keyword across multiple fields
            if (searchKeyword && searchKeyword.trim()) {
                const searchCondition = {
                    $or: [
                        { title: { $regex: searchKeyword.trim(), $options: 'i' } },
                        { introduction: { $regex: searchKeyword.trim(), $options: 'i' } },
                        { description: { $regex: searchKeyword.trim(), $options: 'i' } }
                    ]
                };

                if (query.$and) {
                    query.$and.push(searchCondition);
                } else if (query.$or) {
                    query.$and = [{ $or: query.$or }, searchCondition];
                    delete query.$or;
                } else {
                    query.$or = searchCondition.$or;
                }
            }

            // console.log('Final Query:', JSON.stringify(query, null, 2));

            const jobs = await this.jobRepository.getByFilter(query, {page, limit});
            return jobs;
        } catch (error) {
            console.log('getAllJobs Service Error:', error.message);
            throw error;
        }
    }

    async getMyJobs(id, options = {}) {
        try {
            const jobs = await this.jobRepository.getMyJobs(id, options);
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
            // console.log('getASingleJob Service Error.');
            throw error;
        }
    }

    async getRecentJobs(options = {}) {
        try {
            const {page, limit } = options;
            const {jobs, totalJobs} = await this.jobRepository.getRecentJobs({page, limit});
            if (!jobs || jobs.length === 0) {
                throw new ErrorHandler('No recent jobs found.', 404);
            }
            return { jobs, totalJobs};
        } catch (error) {
            console.log('getRecentJobs Service Error.');
            throw error;
        }
    }

    async getPopularCategories() {
        try {
            const categories = await this.jobRepository.getPopularCategories();
            return categories;
        } catch (error) {
            console.log('getPopularCategories Service Error.');
            throw error;
        }
    }
}

export default JobService;