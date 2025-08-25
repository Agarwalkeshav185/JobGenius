import express from 'express';
import {postJob, getASingleJob, getAllJobs, getMyJobs, deleteJob, getRecentJobs} from '../../controllers/job-controller.js';
import {isAuthenticated, isAuthorized} from '../../middlewares/auth-middleware.js';

const router = express.Router();

router.get('/getall', getAllJobs);
router.get('/recent', getRecentJobs); // No authentication needed for homepage

router.post('/post',isAuthenticated, isAuthorized('Employer'), postJob);

router.get('/getmyjobs', isAuthenticated, isAuthorized('Employer'), getMyJobs);
router.delete('/delete/:id', isAuthenticated, isAuthorized('Employer'), deleteJob);
router.get('/get/:id', isAuthenticated, getASingleJob);

export default router;
