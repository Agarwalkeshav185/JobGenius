import express from 'express';
import { logout, loginUser, register, getUser, updateProfile, updatePassword, verifyEmailOTP } from '../../controllers/user-controller.js';
import {isAuthenticated, isAuthorized} from '../../middlewares/auth-middleware.js';
import {postJob, getASingleJob, getAllJobs, getMyJobs, deleteJob} from '../../controllers/job-controller.js';
import { postApplication } from '../../controllers/application-controller.js';
import Category from './categoryRoutes.js';

const router = express.Router();
router.post('/user/register', register);
router.post('/user/login', loginUser);
router.get('/user/logout', isAuthenticated, logout);
router.get('/user/getUser', isAuthenticated, getUser);
router.put('/user/update/profile', isAuthenticated, updateProfile);
router.put('/user/update/password', isAuthenticated, updatePassword);
router.post('/user/verifyEmail', verifyEmailOTP);

router.post('/job/post',isAuthenticated, isAuthorized('Employer'), postJob);
router.get('/job/getall', getAllJobs);
router.get('/job/getmyjobs', isAuthenticated, isAuthorized('Employer'), getMyJobs);
router.delete('/job/delete/:id', isAuthenticated, isAuthorized('Employer'), deleteJob);
router.get('/job/get/:id', isAuthenticated, getASingleJob);

router.post('/applications/post/:id', isAuthenticated, isAuthorized('Job Seeker'), postApplication);

router.use('/category', Category);

export default router;