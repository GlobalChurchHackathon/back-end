const express = require('express')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/user');
const router = express.Router();

//Get Route - Get All Users
router.get('/', async (req, res) => {
    const data = await User.find().sort('name');
    res.send(data);
  });

// Post Route - Add New User
router.post('/', async (req, res) => {
    // Hash Passwords
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    const data = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    const savedUser = await data.save();
    res.send(savedUser);
});

// Put & Patch Routes - Update User by ID

// Delete Routes - Delete User by ID

module.exports = router;