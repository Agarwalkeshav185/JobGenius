import { catchAsynErrors } from '../middlewares/catchAsyncErrors.js';
import ApplicationService from '../services/application-service.js';

const applicationService = new ApplicationService();

const postApplication = catchAsynErrors(async (req, res, next)=>{
    try {
        const {id} = req.params;
        const {name, email, phoneNumber, address, coverLetter, linkedin, github, portfolio} = req.body;
        if(!name || !email || !phoneNumber || !address){
            return res.status(400).json({
                success : false,
                message : 'All Fields are required.'
            });
        }

        const userData = {
            id : req.user.id,
            name : name,
            email : email,
            phoneNumber : phoneNumber,
            address : address,
            coverLetter : coverLetter,
            role : 'Job Seeker',
            Linkedin : linkedin, 
            GitHub : github, 
            Portfolio : portfolio
        }
        
        let resumeFile = null;
        if(req.files && req.files.resume){
            resumeFile = req.files.resume;
        }
        else if(req.user?.resume?.url){
            resumeFile = req.user.resume;
        }
        else {
            return res.status(400).json({
                success : false,
                message : 'Please Upload your resume.'
            });
        }

        const application = await applicationService.postApplication(id, userData, resumeFile);
        return res.status(201).json({
            success : true,
            message : 'You have successfully applied for the job.',
            data : application
        });
    } catch (error) {
        console.log('Application Controller Error', error);
        return res.status(error.statusCode || 500).json({
            success : false,
            message : error.message
        });
    }
});

const employerGetApplication = catchAsynErrors(async (req, res, next)=>{
    try {
        const response = await applicationService.employerGetApplication(req.user._id);
        return res.status(200).json({
            success : true,
            data : response,
            message : 'Successfully fetched all Applications.'
        });
    } catch (error) {
        console.log('Application Controller Error');
        return res.status(error.statusCode).json({
            success : false,
            message : error.message
        });
    }
});

const JobSeekerGetApplication = catchAsynErrors(async (req, res, next)=>{
    try {
        const response = await applicationService.employerGetApplication(req.user._id);
        return res.status(200).json({
            success : true,
            data : response,
            message : 'Successfully fetched all Applications.'
        });
    } catch (error) {
        console.log('Application Controller Error');
        return res.status(error.statusCode).json({
            success : false,
            message : error.message
        });
    }
});

const deleteApplication = catchAsynErrors(async (req, res, next)=>{
    try {
        
    } catch (error) {
        console.log('Application Controller Error');
        return res.status(error.statusCode).json({
            success : false,
            message : error.message
        });
    }   
});

export {
    postApplication,
    deleteApplication,
    JobSeekerGetApplication,
    employerGetApplication,
}