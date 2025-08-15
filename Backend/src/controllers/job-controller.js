import { catchAsynErrors } from '../middlewares/catchAsyncErrors.js';
import { ErrorHandler } from '../middlewares/error-middlewares.js';
import JobService from '../services/job-service.js';

const jobService = new JobService();

const postJob = catchAsynErrors(async(req, res, next)=>{
    try {
        const {
            title,  jobType,    location,    companyName,
            introduction,
            responsibilites,
            qualifications,
            offers,
            salary,
            hirihngMultipleCandidates,
            personalWebsiteTitle,
            personalWebsiteUrl,
            categoryName
        } = req.body;

        if(!title || !jobType || !location || !companyName||
            !introduction||
            !responsibilites||
            !qualifications||
            !salary||
            !categoryName){
                return res.status(400).json({
                    success: false,
                    message : 'Please provide full job details.'
                });
            }
        if((personalWebsiteTitle && !personalWebsiteUrl) || (!personalWebsiteTitle && personalWebsiteUrl)){
            return res.status(400).json({
                success: false,
                message : 'Please either provide the title and url of the website together or leave them blank together'
            });
        }

        

        const postedBy = req.user.id;

        const job = await jobService.postJob({
            title,  jobType,    location,    companyName,
            introduction,
            responsibilites,
            qualifications,
            offers,
            salary,
            hirihngMultipleCandidates,
            personalWebsite : {
                title : personalWebsiteTitle,
                url : personalWebsiteUrl
            },
            postedBy,
            categoryName
        });

        return res.status(200).json({
            success : true, 
            data : job,
            message : 'Job Posted Successfully.'
        });
    } catch (error) {
        console.log('Post Job Controller Error');
        return res.status(500).json({
            success: false,
            message : error.message
        });
    }
});

const getAllJobs = catchAsynErrors(async(req, res, next)=>{
    try {
        const {
            jobType,
            city,
            jobNiche,
            searchKeyword
          } = req.query;
        const jobs = await jobService.getAllJobs({
            jobType,
            city,
            jobNiche,
            searchKeyword
        });
        return res.status(200).json({
            success : true,
            message : 'Able to fetched the jobs.',
            data : jobs,
            count : jobs.length
        });
    } catch (error) {
        console.log('Get All Jobs Controller Error');
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});
const getMyJobs = catchAsynErrors(async(req, res, next)=>{
    try {
        const jobs = await jobService.getMyJobs(req.user.id);
        return res.status(200).json({
            success : true,
            message : 'Successfully fetched the jobs.',
            data : jobs
        });
    } catch (error) {
        console.log('Get My Jobs Controller Error');
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});



const deleteJob = catchAsynErrors(async(req, res, next)=>{
    try {
        const {id} = req.params;
        const userId = req.user.id;
        console.log(id, userId);
        const deletedJob = await jobService.deleteJob(id, userId);
        return res.status(200).json({
            success : true,
            message : 'Successfully Deleted the job',
            data: deletedJob
        });
    } catch (error) {
        console.log('Delete Job Controller Error');
        var statusCode = 500;
        if(error.message == 'Data not found.' || error.message =='Oops! Job not found.'){
            statusCode = 404;
        }
        return res.status(statusCode).json({
            success : false,
            message : error.message
        });
    }
});


const getASingleJob = catchAsynErrors(async(req, res, next)=>{
    try {
        const {id} = req.params;
        const job = await jobService.getASingleJob(id);
        return res.status(200).json({
            success : true,
            message : 'Successfully fetched the job.',
            data : job
        });
    } catch (error) {
        console.log('Get A Single Job Controller Error');
        var statusCode = 500;
        if(error.message == 'Job not found.'){
            var statusCode = 404;
        }
        return res.status(statusCode).json({
            success : false,
            message : error.message
        });
    }
});

export {
    postJob,
    getAllJobs,
    getMyJobs,
    deleteJob,
    getASingleJob,

}