import express from 'express';
import { logout, loginUser, register, getUser, updateProfile } from '../../controllers/user-controller.js';
import isAuthenticated from '../../middlewares/auth-middleware.js';

const router = express.Router();
router.post('/user/register', register);
router.post('/user/login', loginUser);
router.get('/user/logout', isAuthenticated, logout);
router.get('/user/me', isAuthenticated, getUser);
router.put('/user/update/profile', isAuthenticated, updateProfile);

export default router;