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
    
}

export default JobRepository;