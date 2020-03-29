const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require("../models/User");

// GET route
router.get("/", async (req, res) => {
  const users = await User.find().sort("email");
  res.send(users);
});

//POST route
router.post('/', async (req, res) => {
  // Hash Passwords
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);
  let hashedPassword2 = await bcrypt.hash(req.body.password2, salt);

  const data = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      password2: hashedPassword2
  })

  const savedUser = await data.save();
  res.send(savedUser);
});

// PUT route
router.put("/:id", async (req, res) => {});

// DELETE route
router.delete("/:id", async (req, res) => {});

module.exports = router;
