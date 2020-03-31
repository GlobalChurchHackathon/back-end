const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const authService = require ("../services/jwAuth");
var shService = require("../services/saltnhash");

const User = require("../models/User");

// GET route
router.get("/", async (req, res) => {
  const users = await User.find().sort("email");
  res.send(users);
});

router.post("/", async (req, res) => {
  // Hash Passwords
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);

  const data = new User({
    email: req.body.email,
    password: hashedPassword
  });

  const savedUser = await data.save();
  res.send(savedUser);
});

// PUT route
router.put("update/:id", async (req, res) => {
  User.findById(req.params.id)
    .then(users => {
      users.firstName = req.body.firstName;
      users.lastName = req.body.lastName;
      users.email = req.body.email;
      users.password = req.body.password;

      users
        .save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.get("/login", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
          // res.cookie('jwt', token);
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

module.exports = router;
