const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express();
const bodyParser = requre("body-parser");

const userRoutes = require("../back-end/routes/user");
const profileRoutes = require("../back-end/routes/profile");

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use(bodyParser.json());

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
