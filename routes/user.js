const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require("../models/User");
const Profile = require("../models/Profile");

// GET route
router.get("/", async (req, res) => {
  const users = await User.find().sort("email");
  res.send(users);
});

// Get User - Get Single User
router.get("/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.send(user)
    } catch (err) {
      res.json({ message: err })
    }
  });

// Post route - Add New User
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
router.put("/update/:id", (req, res) => {
    User.findById(req.params.id)
    .then(users => {
        users.firstName = req.body.firstName;
        users.lastName = req.body.lastName;
        users.email = req.body.email;
        users.password = req.body.password;

        users.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE route
router.delete("/:id", async (req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then(() =>res.json('User deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
