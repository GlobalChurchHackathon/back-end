const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require("../models/User");

// GET route
router.get("/", async (req, res) => {
  const users = await User.find().sort("email");
  res.send(users);
});

// login route - compare passwords and return JWT 
// token with _id and admin fields - secured
router.route('/user/login').post((req, res) => {
    
    //unsure if this is specifically for angular or if react can use it too.
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
          // res.cookie('jwt', token);
          res.json({
            userId: user._id,
            admin: user.admin,
            token: token
          });
          console.log('Successful login! Welcome Friend!!');
        } else {
          console.log('Incorrect Password');
          res.send('Incorrect Password');
        }
      }
    });
  } else {
    res.status(401);
    res.send('User is already logged in');
  }
});



//POST route
router.post('/', async (req, res) => {
  // Hash Passwords
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);

  const data = new User({
      email: req.body.email,
      password: hashedPassword
  })

  const savedUser = await data.save();
  res.send(savedUser);
});

// PUT route
router.put("/:id", async (req, res) => {});

// DELETE route
router.delete("/:id", async (req, res) => {});

module.exports = router;
