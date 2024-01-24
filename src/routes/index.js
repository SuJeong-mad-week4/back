// src/routes/index.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const calendarController = require('../controllers/calendarController');
const petController = require('../controllers/petController');
const todayController = require('../controllers/todayController');

router.use(express.json());

router.post('/user/sign-up', userController.signupUser);
router.post('/user/login', userController.loginUser);

router.post('/pet/create', petController.createPet);
router.post('/pet/grow', petController.growPet);
router.post('/pet/save', petController.savePet);
router.get('/pet/get', petController.getPet);
router.get('/pet/gets', petController.getsPet);

router.get('/calendar', calendarController.getUserCalendar);
router.post('/calendar/create', calendarController.createCalendar);
router.get('/calendar/get', calendarController.getCalendar);
router.post('/calendar/delete', calendarController.deleteCalendar);
router.get('/calendar/summarize', calendarController.summarizeCalendar);

router.post("/today/create", todayController.createToday);
router.get("/today/get", todayController.findUserToday);
router.get("/today/get-today", todayController.findToday);
router.get("/today/find", todayController.findOneToday);

module.exports = router;