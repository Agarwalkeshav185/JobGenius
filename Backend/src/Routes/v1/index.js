import express from 'express';
import { logout, loginUser, register, getUser, updateProfile, updatePassword } from '../../controllers/user-controller.js';
import {isAuthenticated, isAuthorized} from '../../middlewares/auth-middleware.js';
import {postJob, getASingleJob, getAllJobs, getMyJobs, deleteJob} from '../../controllers/job-controller.js';

const router = express.Router();
router.post('/user/register', register);
router.post('/user/login', loginUser);
router.get('/user/logout', isAuthenticated, logout);
router.get('/user/getUser', isAuthenticated, getUser);
router.put('/user/update/profile', isAuthenticated, updateProfile);
router.put('/user/update/password', isAuthenticated, updatePassword);

router.post('/job/post',isAuthenticated, isAuthorized('Employer'), postJob);
router.get('/job/getall', getAllJobs);
router.get('/job/getmyjobs', isAuthenticated, isAuthorized('Employer'), getMyJobs);
router.delete('/job/delete/:id', isAuthenticated, isAuthorized('Employer'), deleteJob);
router.get('/job/get/:id', isAuthenticated, getASingleJob);

export default router;