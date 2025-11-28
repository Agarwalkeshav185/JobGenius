import express from 'express';
import { postApplication, getApplicationsOfSeeker, getSingleApplication } from '../../controllers/application-controller.js';
import {isAuthenticated, isAuthorized} from '../../middlewares/auth-middleware.js';

const router = express.Router();
router.get('/get', isAuthenticated, getApplicationsOfSeeker);
router.get('/get/:id', isAuthenticated, getSingleApplication);
router.post('/post/:id', isAuthenticated, isAuthorized('Job Seeker'),  postApplication);

export default router;
