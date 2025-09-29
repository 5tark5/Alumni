import { authenticate } from '../middlewares/studentMiddleware.js';

const express = require('express');

const router = express.Router();

const { signupStudent, loginStudent, logoutStudent, updateCurrentStudent, getCurrentStudent } = require('../controllers/studentController');

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

export default Router;