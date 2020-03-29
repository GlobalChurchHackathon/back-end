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
router.put("update/:id", async (req, res) => {
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

})

module.exports = router;