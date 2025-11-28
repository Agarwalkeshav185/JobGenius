import CrudRepository from './crud-repository.js';
import Application from '../models/application.js';
import { ErrorHandler } from '../middlewares/error-middlewares.js';

class ApplicationRepository extends CrudRepository{
    constructor(){
        super(Application);
    }

    async getAppliedBeforeApplication(data){
        try {
            const application = await Application.findOne(data);
            return application;
        } catch (error) {
            console.log('Application Repository Error');
            throw new ErrorHandler(error.message, 500);
        }
    }

    async getApplicationAppiledByUser(data){
        try {
            const applications = await Application.find(data).populate({
                path: 'jobInfo.company',
                select : 'name'
            })
            .sort({ createdAt: -1 });
            return applications;
        } catch (error) {
            console.log('Application Repository Error');
            throw new ErrorHandler(error.message, 500);
        }
    }

    async getSingleApplication(applicationId){
        try{
            const application = await Application.findById(applicationId).populate({
                path: 'jobInfo.jobId',
                select: 'title company location salary jobType status'
            });

            if (!application) {
                console.log('❌ Application not found in database');
                return null;
            }
            return application;
        }
        catch(error){
            console.log('Application Repository Error', error);
            if (error.name === 'CastError') {
                throw new ErrorHandler('Invalid application ID format', 400);
            }
            throw new ErrorHandler(error.message, 500);
        }
    }
};

export default ApplicationRepository;

