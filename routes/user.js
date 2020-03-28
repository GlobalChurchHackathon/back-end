const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Profile = require('../models/Profile');

// GET route
router.get("/", async (req, res) => {
    const users = await User.find().sort("email");
    res.send(users);
})

// POST route
router.post("/", async (req, res) => {

})

// PUT route
router.put("/:id", async (req, res) => {

})


// DELETE route
router.delete("/:id", async (req, res) => {

})

module.exports = router;