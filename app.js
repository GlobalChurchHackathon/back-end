const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express();

// Static Routes
app.get('/', (req, res) => {
  return res.send('Hello World!');
});

// Import Routes
const basicRoutes = require('./routes/basic');

// Routes
app.use('/basic', basicRoutes);

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => console.log('connection successful'))
.catch((err) => console.error(err));
mongoose.Promise = global.Promise;

module.exports = app;
