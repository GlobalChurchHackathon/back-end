const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

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

