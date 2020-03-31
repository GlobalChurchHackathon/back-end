const express = require("express");
const router = express.Router();

const authService = require('../services/jwtAuth');
const shService = require('../services/saltnhash');

const jwt = require('jsonwebtoken');

// login route - compare passwords and return JWT 
// token with _id and admin fields - secured
router.route('/users/login').post((req, res) => {
  let header = req.headers['authorization'];
  const bearer = header.split(' ');
  const token = bearer[1];
  if (token === 'undefined') {
    var checkEmail = req.body.email;
    var checkPassword = req.body.password;
    User.findOne({ email: checkEmail }, (err, user) => {
      if (!user) {
        return res.status(401).send('Login Failed, User not found');
      } if (user) {
        let passwordMatch = shService.comparePasswords(checkPassword, user.password);
        if (passwordMatch) {
          let token = authService.signUser(user); // created token
          res.cookie('jwt', token);
          res.json({
            userId: user._id,
            admin: user.admin,
            token: token
          });
          console.log('Login Successful');
        } else {
          console.log('Wrong Password');
          res.send('Wrong Password');
        }
      }
    });
  } else {
    res.status(401);
    res.send('A User is already logged in');
  }
});

// entire route verified!
// logout Route
router.route('/users/logout').post((req, res) => {
  res.cookie("jwt", "", { expires: new Date(0) }); // this line is now unnecessary since we are using headers not cookies
  res.json({ message: 'User Logged Out' });
  console.log('Loggout Successful');
});

module.exports = router;