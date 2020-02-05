const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');

const validateRegisterInput = require('./registerUtils');

const User = require('../user/UserModel');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/', async (req, res) => {
  // TODO: move this controller logic out of the routing
  // TODO: Better input error handling
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // TODO: might need to look into sanitizing the input.
  const { email, password } = req.body;

  // TODO: better error handling for all of the async stuff...
  try {
    const user = await User.findOne({ email });
    // TODO: better error handling for the errors here...
    if (user) {
      // TODO: return error codes and/or messages
      return res.status(400).json({ email: 'Email is already registered' });
    }
  } catch (userFindError) {
    // TODO: ensure the error is related specifically to not finding the user before just continuing
    // no user was found is good
  }

  const newUser = new User({
    email,
  });

  try {
    // TODO: may not be the best way to store but better than plain
    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;
    await newUser.save();
    return res.end();
  } catch (error) {
    return res.status(500).json({ error: 'something went wrong' });
  }
});

module.exports = router;
