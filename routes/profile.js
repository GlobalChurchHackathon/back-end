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
router.get("/", async (req, res) => {
    const users = await Profile.find();
    res.send(users);
  });
  


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      // user: req.user.id
      user: req.body.user
    });

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    // only populate from user document if profile exists
    res.json(profile.populate('user', ['firstName', 'lastName']));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post("/",  async (req, res) => {
    const {error} = validationResult(req.body);

    if(error){
        //return res.status(400).send(error.details[0].message)
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
  
    try {
        console.log("test1")

        const profile = new Profile ({
            user: req.body.user,
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
  });


// PUT route
router.put("/:id", async (req, res) => {

})


// DELETE route
// router.delete("/:id", async (req, res) => {
//   User.findByIdAndDelete(req.params.id)
//   .then(() =>res.json('Profile deleted.'))
//   .catch(err => res.status(400).json('Error: ' + err));
// });

// router.delete('/:user', async (req, res) => {
//   try {

//     // // Remove profile
//     await Profile.findOneAndRemove({ user: req.body.user });
//     res.json({ msg: 'User deleted' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });



router.delete('/:user', async (req, res) => {
  const profile = await Profile.findOneAndRemove(req.params.user)
  console.log(profile);
  if (!profile) {
      return res.status(404).json({msg: 'Profile not found'})
  }
  res.json({
      msg: 'Profile Removed'
  });
} )

module.exports = router;