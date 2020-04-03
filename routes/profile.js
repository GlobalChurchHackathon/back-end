const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { validationResult } = require('express-validator');
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

// router.get('/me', async (req, res) => {
//     try {
//       const profile = await Profile.findOne({
//         user: req.body.id
//       });

//       if (!profile) {
//         return res.status(400).json({ msg: 'There is no profile for this user' });
//       }

//       // only populate from user document if profile exists
//       res.json(profile.populate('user', ['name', 'avatar']));
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }); 


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


router.post("/", async (req, res) => {
  const { error } = validationResult(req.body);

  if (error) {
    //return res.status(400).send(error.details[0].message)
    return res.status(400).json({ msg: 'There is no profile for this user' });
  }

  try {
    console.log("test1")

    const profile = new Profile({
      user: req.body.user,
      // firstName: req.body.firstName,
      // lastName: req.body.lastName,
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
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')

  }
});


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

// PUT route
//   Profile.findById(req.params.id)
//     .then(profile => {
//       // profile.firstName = req.body.firstName;
//       // profile.lastName = req.body.lastName;
//       // profile.address1 = req.body.address1;
//       profile.address2 = req.body.address2;
//       profile.city = req.body.city;
//       profile.state = req.body.state;
//       profile.zipCode = req.body.zipCode;
//       profile.phoneNumber = req.body.phoneNumber;

//       profile.save()
//         .then(() => res.json('Profile updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });
router.put('/:user',  async (req, res) => {
  const { error } = validationResult(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  const profile = await Profile.findOneAndUpdate(
      req.body.user,
      {
          address1: req.body.address1,
          address2: req.body.address2,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
          phoneNumber: req.body.phoneNumber,

      },
  );
  if (!profile) return res.status(404).send("Invalid Credentials")
      await profile.save();
      res.send(profile);
  });


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