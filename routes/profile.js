const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = '../models/User';
const Profile = '../models/Profile';

// GET route
router.get("/", async (req, res) => {
    const profile = await Profile.find().sort("userId");
    res.send(profile);
})

// POST route
//@route    POSt api/profile
//@desc     Create or Update user profile
//@access   Private
router.post('/', async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const {
            firstName,
            lastName,
            address1,
            address2,
            city,
            state,
            zipCode,
            phoneNumber,
        } = req.body;
        console.log("Test1")

        //Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;

        if (firstName) profileFields.firstName = firstName;
        if (lastName) profileFields.lastName = lastName;
        if (address1) profileFields.address1 = address1;
        if (address2) profileFields.address2 = address2;
        if (city) profileFields.city = city;
        if (state) profileFields.state = state;
        if (zipCode) profileFields.zipCode = zipCode;
        if (phoneNumber) profileFields.phoneNumber = phoneNumber;

        // console.log(profileFields.skills);

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }

            //Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);
// router.post("/", auth, async (req, res) => {
//     const {error} = validationResult(req.body);

//     if(error){
//         return res.status(400).send(error.details[0].message)
//     }

//     try {
//         let profile = await User.findOne({userId: req.body.userId})

//         if(!profile) {
//             return res 
//             .status(400)
//             .json({errors: [{ msg: 'Invalid Credentials'}]})
//         }

//         profile = new Profile ({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             address1: req.body.address1,
//             address2: req.body.address2,
//             city: req.body.city,
//             state: req.body.state,
//             zipCode: req.body.zipCode,
//             phoneNumber:req.body.phoneNumber
//         })

//         if(profile.userId == req.body.userId) {
//             await profile.save();
//             res.send(profile)
//         }
//     } catch(err) {
//         console.error(err.message);
//         res.status(500).send('Server Error')
//     }

// })

// PUT route
router.put("/:id", async (req, res) => {

})


// DELETE route

router.delete("/:id", async (req, res) => {

})

module.exports = router;