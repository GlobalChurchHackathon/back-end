const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express();

// Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Routes
app.get('/', (req, res) => {
  return res.send('Hello World!');
});

// Import Routes
const usersRoutes = require('./routes/users');
const basicRoutes = require('./routes/basic');

// Routes
app.use('/basic', basicRoutes);
app.use('/users', usersRoutes);

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
