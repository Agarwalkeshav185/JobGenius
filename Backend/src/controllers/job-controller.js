import { catchAsynErrors } from '../middlewares/catchAsyncErrors.js';
import { ErrorHandler } from '../middlewares/error-middlewares.js';
import JobService from '../services/job-service.js';

const jobService = new JobService();

const postJob = catchAsynErrors(async(req, res, next)=>{
    try {
        const {
            title,  jobType,    location,    companyId,
            introduction,
            responsibilities,
            qualifications,
            offers,
            minSalary,
            maxSalary,
            jobPostDeadline,
            hiringMultipleCandidates,
            categoryName
        } = req.body;

        if(!title || !jobType || !location ||
            !introduction||
            !responsibilities||
            !qualifications||
            !minSalary||
            !maxSalary||
            !jobPostDeadline||
            !hiringMultipleCandidates||
            !categoryName){
            return res.status(400).json({
                    success: false,
                    message : 'Please provide full job details.'
            });
        }

        const postedBy = req.user.id;

        const job = await jobService.postJob({
            title,  jobType,    location,    companyId,
            introduction,
            responsibilities,
            qualifications,
            offers,
            minSalary,
            maxSalary,
            jobPostDeadline,
            hiringMultipleCandidates,
            categoryName
        }, req.user._id);

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
            location,
            title,
            status,
            page,
            categoryId,
            companyId,
            limit,
            searchKeyword,
            experienceLevel, 
            minSalary,      
            maxSalary 
          } = req.query;
          
        const { jobs, pagination, count } = await jobService.getAllJobs({
            jobType,        
            city,
            location,
            searchKeyword,
            title, 
            status,
            categoryId,
            companyId,
            experienceLevel, 
            minSalary,      
            maxSalary 
        }, {page, limit});
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched jobs.',
            data: jobs,
            pagination: {
                currentPage: parseInt(page) || 1,
                totalPages: pagination?.totalPages || Math.ceil(count / (limit || 10)),
                totalItems: count || jobs.length,
                itemsPerPage: parseInt(limit) || 10,
                hasNextPage: pagination?.hasNextPage || false,
                hasPrevPage: pagination?.hasPrevPage || false
            }
        });
        
    } catch (error) {
        console.log("error:- ", error);
        console.log('Get All Jobs Controller Error');
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
const getMyJobs = catchAsynErrors(async(req, res, next)=>{
    try {
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            title: req.query.search || '',
            status: req.query.status || 'Open',
        };
        const jobs = await jobService.getMyJobs(req.user.id, options);
        return res.status(200).json(
            jobs
        );
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

const getRecentJobs = catchAsynErrors(async(req, res, next)=>{
    try{
        const { page = 1, limit = 6 } = req.query;
        const {jobs, totalJobs} = await jobService.getRecentJobs({page, limit});
        
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched recent jobs.',
            data: jobs,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalJobs / limit),
                totalItems: totalJobs,
                itemsPerPage: parseInt(limit),
                hasNextPage: (page * limit) < totalJobs,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.log('Get Recent Jobs Controller Error');
        var statusCode = 500;
        if(error.message == 'No recent jobs found.'){
            statusCode = 404;
        }
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

const getPopularCategories = catchAsynErrors(async (req, res, next) => {
    try {
        const categories = await jobService.getPopularCategories();
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched popular categories.',
            data: categories
        });
    } catch (error) {
        console.log('Get Popular Categories Controller Error');
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
const getJobDescription = async(req, res, next) =>{
    try{
        const jobId = req.params.id;
        const Job = await jobService.getJobDescription(jobId);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched popular categories.',
            data: Job
        });
    }catch(error){
        console.log('Get Job Description Controller Error');
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export {
    postJob,
    getAllJobs,
    getMyJobs,
    deleteJob,
    getASingleJob,
    getRecentJobs,
    getPopularCategories,
    getJobDescription   
}