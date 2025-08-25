import express from 'express';
import { logout, loginUser, register, getUser, updateProfile, updatePassword, verifyEmailOTP } from '../../controllers/user-controller.js';
import {isAuthenticated, isAuthorized} from '../../middlewares/auth-middleware.js';
import { postApplication } from '../../controllers/application-controller.js';
import Job from './jobRoutes.js';
import Category from './categoryRoutes.js';
import Company from './comapnyRoutes.js';
import statsRoutes from './statsRoutes.js';

const router = express.Router();
router.post('/user/register', register);
router.post('/user/login', loginUser);
router.get('/user/logout', isAuthenticated, logout);
router.get('/user/getUser', isAuthenticated, getUser);
router.put('/user/update/profile', isAuthenticated, updateProfile);
router.put('/user/update/password', isAuthenticated, updatePassword);
router.post('/user/verifyEmail', verifyEmailOTP);

router.use('/job', Job);

router.post('/applications/post/:id', isAuthenticated, isAuthorized('Job Seeker'), postApplication);

router.use('/category', Category);
router.use('/company', Company);
router.use('/stats', statsRoutes);

export default router;