const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Routes
app.get('/', (req, res) => {
  return res.send('Hello World!');
});

const basicRoutes = require('./routes/basic');
const userRoutes = require("../back-end/routes/user");
const profileRoutes = require("../back-end/routes/profile");

app.use('/basic', basicRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);

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
