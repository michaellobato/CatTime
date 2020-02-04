const express = require('express');

const router = express.Router();
const isEmpty = require('lodash/fp/isEmpty');
const bcrypt = require('bcryptjs');

const validateRegisterInput = require('./registerUtils');

const User = require('../user/UserModel');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/', async (req, res, next) => {
  // TODO: Better input error handling
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const [userFindError, user] = await User.findOne({ email: req.body.email });
  // TODO: better error handling for the errors here...
  if (user || !isEmpty(userFindError)) {
    // TODO: return error codes and/or messages
    return res.status(400).json({ email: 'Email is already registered' });
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });

  // TODO: may not be the best way to store but better than plain
  // Hash password before saving in database
  const [genError, salt] = await bcrypt.genSalt(10);

  // TODO: better error handling for all of the following...
  if (genError) {
    return res.status(500).json({ error: 'something went wrong' });
  }

  const [hashError, hash] = await bcrypt.hash(req.body.password, salt);

  if (hashError) {
    return res.status(500).json({ error: 'something went wrong' });
  }

  newUser.password = hash;
  const [dbSaveError, dbUser] = newUser.save();

  if (dbSaveError) {
    return res.status(500).json({ error: 'something went wrong' });
  }

  // TODO: don't just return user
  res.json(dbUser);

  return next();
});
