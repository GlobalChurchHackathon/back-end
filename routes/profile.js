const express = require('express');
const router = express.Router();

const User = '../models/User';
const Profile = '../models/Profile';

// GET route
router.get("/", async (req, res) => {
    const profile = await Profile.find().sort("userId");
    res.send(profile);
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