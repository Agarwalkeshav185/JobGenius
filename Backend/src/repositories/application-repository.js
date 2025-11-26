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
            const applications = await Application.find(data);
            return applications;
        } catch (error) {
            console.log('Application Repository Error');
            throw new ErrorHandler(error.message, 500);
        }
    }
};

export default ApplicationRepository;

