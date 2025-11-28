import ApplicationRepository from '../repositories/application-repository.js';
import JobRepository from '../repositories/job-repository.js';
import { uploadResumeToCloudinary } from '../utils/cloudinaryUpload.js';
import { ErrorHandler } from '../middlewares/error-middlewares.js';

class ApplicationService{
    constructor(){
        this.applicationRepository = new ApplicationRepository();
        this.jobRepository = new JobRepository();
    }

    async postApplication(jobId, userData, resumeFile){
        try {
            const socialMedia = {
                Linkedin : userData.Linkedin,
                GitHub : userData.GitHub,
                Portfolio : userData.Portfolio
            }
            const jobSeekerInfo = {
                id : userData.id,
                name : userData.name,
                email : userData.email,
                phoneNumber : userData.phoneNumber,
                address : userData.address,
                coverLetter : userData.coverLetter,
                role : 'Job Seeker',
                SocialMediaLinks : socialMedia
            }
            const jobDetails = await this.jobRepository.get(jobId);
            
            if(!jobDetails){
                throw new ErrorHandler('Job not found.', 404);
            }
            const isAppliedBefore = await this.applicationRepository.getAppliedBeforeApplication({
                'jobInfo.jobId': jobId,              
                'jobSeekerInfo.id': userData.id
            });

            if(isAppliedBefore){
                throw new ErrorHandler('You have already applied for this job.', 404);
            }

            if(!resumeFile.public_id && !resumeFile.url){
                try {
                    const resume = await uploadResumeToCloudinary(resumeFile);
                    jobSeekerInfo.resume = resume;
                } catch (error) {
                    console.log("Error : ", error);
                    throw new ErrorHandler('Failed to upload Resume', 500);
                }
            }
            else{
                jobSeekerInfo.resume = resumeFile;
            }

            const employerInfo = {
                id : jobDetails.postedBy,
                role: 'Employer'
            }

            const jobInfo = {
                jobId : jobId,
                jobTitle : jobDetails.title,
                company : jobDetails.companyId
            }

            const statusHistory = {
                status : 'Applied',
                changedBy : {
                    userId : userData.id,
                    role : 'Job Seeker'
                },
                changedAt : new Date()
            }

            const application = await this.applicationRepository.create({
                jobSeekerInfo,
                employerInfo,
                jobInfo,
                statusHistory
            });
            return application;
        } catch (error) {
            console.log('Application Service Error');
            throw new ErrorHandler(error.message, error.statusCode);
        }
    }

    async employerGetApplication(userId){
        try {
            const applications = await this.applicationRepository({
                "employerInfo.id" : userId,
                "deletedBy.jobSeeker" : false
            });
            return applications;
        } catch (error) {
            console.log('Application Service Error');
            throw new ErrorHandler(error.message, error.statusCode);
        }
    }

    async deleteApplication(){
        try {
            
        } catch (error) {
            console.log('Application Service Error');
            throw new ErrorHandler(error.message, error.statusCode);
        }
    }

    async getApplicationsOfSeeker(seekerId){
        try{
            const data = {
                "jobSeekerInfo.id" : seekerId
            }
            const applications = await this.applicationRepository.getApplicationAppiledByUser(data);
            return applications;
        }
        catch(error){
            console.log('Application Service Error');
            throw new ErrorHandler(error.message, error.statusCode);
        }
    }

    async getSingleApplication(applicationId){
        try{
            const application = await this.applicationRepository.getSingleApplication(applicationId);
            console.log(application);
            return application;
        }
        catch(error){
            console.log('Application Service Error');
            throw new ErrorHandler(error.message, error.statusCode);
        }
    }

    async WithdrawApplication(userId, applicationId){
        try{
            const application = await this.applicationRepository.get(applicationId);
            application.status = 'Withdrawn';
            application.statusHistory.push({
                status : 'Withdrawn',
                changedBy : {
                    userId : userId,
                    role : 'Job Seeker'
                },
                changedAt : new Date()
            })
            await application.save();

            console.log(application);
            return application;
        }catch(error){
            console.log('Application Service Error', error);
            throw new ErrorHandler(error.message, error.statusCode);
        }
    }
};

export default ApplicationService;