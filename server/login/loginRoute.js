const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateLoginInput = require('./loginUtils');
const User = require('../user/UserModel');
const keys = require('../config/keys');

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/', async (req, res) => {
  // TODO: move this controller logic out of the routing
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // TODO: might need to look into sanitizing the input.
  const { email } = req.body;
  const { password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    if (!user) {
    // TODO: use error codes
      return res.status(404).json({ error: 'Invalid login credentials' });
    }
  } catch (error) {
    return res.status(404).json({ error: 'Invalid login credentials' });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
      };

      const token = await jwt.sign(
        payload,
        // TODO: obviously inject this in a good way
        keys.secretOrKey,
        { expiresIn: 3600 }, // 1 hour in seconds
      );

      // TODO: should use something like passport-jwt-cookiecombo to store in httponly cookie
      return res.cookie('authentication-token', token, {httpOnly: true}).end();
    }
  } catch (error) {
    // TODO: better error handling
    return res.status(500).json({ error: 'something went wrong' });
  }

  // TODO: use error codes
  return res.status(404).json({ error: 'Invalid login credentials' });
});

module.exports = router;
