const express = require('express');

const router = express.Router();
const register = require('./register/registerRoute');

router.use('/register', register);