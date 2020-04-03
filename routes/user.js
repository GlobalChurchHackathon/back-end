const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");
const Profile = require("../models/Profile");

// GET route - All Users
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

