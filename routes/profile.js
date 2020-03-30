const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {  validationResult } = require('express-validator');

const User = require('../models/User');
const Profile = require('../models/Profile');

// GET route
// router.get("/", async (req, res) => {
//     const profile = await Profile.find().sort("name");
//     res.send(profile);
// })


router.post("/",  async (req, res) => {
    const {error} = validationResult(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    }
  
    try {
        console.log("test1")

        const profile = new Profile ({
            _id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            phoneNumber: req.body.phoneNumber
        })
        await profile.save();
        res.send(profile)

        // if(profile.user == req.body.user.id) {
        //     await profile.save();
        //     res.send(profile)
        // }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

})

// PUT route
router.put("/:id", async (req, res) => {

})


// DELETE route

router.delete("/:id", async (req, res) => {

})

module.exports = router;