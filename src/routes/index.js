// src/routes/index.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const calendarController = require('../controllers/calendarController');

router.use(express.json());

router.post('/user/sign-up', userController.signupUser);
router.post('/user/login', userController.loginUser);


router.get('/calendar', calendarController.getUserCalendar);

module.exports = router;