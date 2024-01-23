// src/routes/index.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const calendarController = require('../controllers/calendarController');
const petController = require('../controllers/petController');

router.use(express.json());

router.post('/user/sign-up', userController.signupUser);
router.post('/user/login', userController.loginUser);

router.post('/pet/create', petController.createPet);
router.post('/pet/grow', petController.growPet);
router.get('/pet/get', petController.getPet);
router.get('/pet/gets', petController.getsPet);

router.get('/calendar', calendarController.getUserCalendar);
router.post('/calendar/create', calendarController.createCalendar);
router.get('/calendar/get', calendarController.getCalendar);
router.post('/calendar/delete', calendarController.deleteCalendar);

module.exports = router;