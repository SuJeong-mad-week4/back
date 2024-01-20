// src/routes/index.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.use(express.json());

router.post('/user/sign-up', userController.signupUser);


router.post('/user/login', userController.loginUser);

module.exports = router;