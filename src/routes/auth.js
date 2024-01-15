const express = require('express');

const authRouter = express.Router();

// const bcrypt = require('bcryptjs');
const authController = require('../controllers/authController');

// const { getSqlData, makeJWT } = require('../utils/helper');
const { loginValidation, signUpValidation } = require('../middleware');

// POST /api/auth/register - register user
authRouter.post('/api/auth/register', signUpValidation, authController.register);

// POST /api/auth/log in - log in user
authRouter.post('/api/auth/login', loginValidation, authController.login);

module.exports = authRouter;
