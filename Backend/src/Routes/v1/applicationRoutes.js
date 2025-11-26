import express from 'express';
import { postApplication } from '../../controllers/application-controller.js';
import {isAuthenticated, isAuthorized} from '../../middlewares/auth-middleware.js';

const router = express.Router();
router.post('/post/:id', isAuthenticated, isAuthorized('Job Seeker'),  postApplication);

export default router;
