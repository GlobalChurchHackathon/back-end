const express = require("express");
const router = express.Router();


const User = require("../models/User");
const Profile = require("../models/Profile");

// GET route
router.get("/", async (req, res) => {
  const users = await User.find().sort("email");
  res.send(users);
});

//POST route
router.route("/user/signup").post((req, res) => {
  let newUser = new User({
    email: req.body.email,
    password: shService.hashPassword(req.body.password)
  });
  newUser
    .save()
    .then(user => {
      res
        .status(200)
        .json({ message: "User added successfully, route to login page" });
    })

    .catch(err => {
      res.status(400).send("Failed to create new record");
    });
});

// PUT route
router.put("/:id", async (req, res) => {});

// DELETE route
router.delete("/:id", async (req, res) => {});

module.exports = router;
