const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');

const User = '../models/User';
const Profile = '../models/Profile';

// GET route
router.get("/", async (req, res) => {
    const profile = await Profile.find().sort("userId");
    res.send(profile);
})

// POST route
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