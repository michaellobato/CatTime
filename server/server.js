const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const api = require('./api');
const keys = require('./config/keys');

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    keys.dbUrl, // TODO: obviously this is not the way to do this...
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

app.use(function (req, res, next) {
  // TODO: this is just here to get it running. Be smarter about what is allowed
  // and obviously don't hard code this...
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
  next();
});

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api', api);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
