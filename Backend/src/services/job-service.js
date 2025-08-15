import { ErrorHandler } from '../middlewares/error-middlewares.js';
import JobRepository from '../repositories/job-repository.js';

class JobService{
    constructor(){
        this.jobRepository = new JobRepository();
    }

    async postJob(data){
        try {
            const job = await this.jobRepository.create(data);
            return job;
        } catch (error) {
            console.log('PostJob Service Error.');
            throw error;
        }
    }

    async getAllJobs(data){
        try {
            const {
                jobType,
                city,
                jobNiche,
                searchKeyword
              } = data;
            
            const query = {};
            if (jobType) query.jobType = jobType;
            if (city) query.location = { $regex: city, $options: 'i' };
            if (jobNiche) query.jobNiche = { $regex: jobNiche, $options: 'i' };
            // unable to serach with a part of the comapny name aaege se h to ho rha h search but koi part se nhi ho rha h.
            if(searchKeyword) query.$or = [ 
                {title : { $regex: searchKeyword, $options: 'i' }},
                {comapnyName : { $regex: searchKeyword, $options: 'i' }},
                {introduction : { $regex: searchKeyword, $options: 'i' }}
                ]

            const job = await this.jobRepository.getByFilter(query);
            return job;
        } catch (error) {
            console.log('getAllJobs Service Error.');
            throw error;
        }
    }

    async getMyJobs(id){
        try {
            const jobs = await this.jobRepository.getMyJobs(id);
            return jobs;
        } catch (error) {
            console.log('getMyJobs Service Error.');
            throw error;
        }
    }

    async deleteJob(id, userId){
        try {
            
            const deletedJob = await this.jobRepository.deleteJob(id, userId);
            if(!deletedJob){
                throw new Error('Oops! Job not found.');
            }
            return deletedJob;
        } catch (error) {
            console.log('DeleteJob Service Error.');
            throw error;
        }
    }

    async getASingleJob(id){
        try {
            const Job = await this.jobRepository.get(id);
            if(!Job){
                throw new Error('Job not found.');
            }
            return Job;
        } catch (error) {
            console.log('getASingleJob Service Error.');
            throw error;
        }
    }
}


export default JobService;