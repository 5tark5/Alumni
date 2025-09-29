import { authenticate } from '../middlewares/studentMiddleware.js';

import express from 'express';

const router = express.Router();

import { signupStudent, loginStudent, logoutStudent, updateCurrentStudent, getCurrentStudent } from "../controllers/studentController.js"

router
    .route('/signup')
    .post(signupStudent);
router
    .route('/login')
    .post(loginStudent);
router
    .route('/logout')
    .get(logoutStudent);
router
    .route('/profile')
    .get(getCurrentStudent,authenticate)
    .put(updateCurrentStudent,authenticate);    

export default router;