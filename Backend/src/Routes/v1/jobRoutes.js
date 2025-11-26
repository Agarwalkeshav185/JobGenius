import express from 'express';
import {postJob, getASingleJob, getAllJobs, getMyJobs, getPopularCategories, deleteJob, getRecentJobs, getJobDescription} from '../../controllers/job-controller.js';
import {isAuthenticated, isAuthorized} from '../../middlewares/auth-middleware.js';

const router = express.Router();

router.get('/getall', getAllJobs);
router.get('/recent', getRecentJobs); // No authentication needed for homepage
router.get('/popular', getPopularCategories); // Route for fetching popular categories
router.get('/get/:id/description', getJobDescription);

router.get('/getmyjobs', isAuthenticated, isAuthorized('Employer','Manager'), getMyJobs);
router.get('/get/:id', getASingleJob);

router.post('/post',isAuthenticated, isAuthorized('Employer','Manager','Admin'), postJob);

router.delete('/delete/:id', isAuthenticated, isAuthorized('Employer'), deleteJob);

export default router;
