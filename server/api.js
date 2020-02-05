const express = require('express');

const router = express.Router();
const register = require('./register/registerRoute');
const login = require('./login/loginRoute');

router.use('/register', register);
router.use('/login', login);

module.exports = router;
