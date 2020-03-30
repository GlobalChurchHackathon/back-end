const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');


const User = require("../models/User");

// GET route
router.get("/", async (req, res) => {
  const users = await User.find().sort("email");
  res.send(users);
});

router.post('/', async (req, res) => {
  // Hash Passwords
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);
  let hashedPassword2 = await bcrypt.hash(req.body.password2, salt);

  const data = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      password2: hashedPassword2
  })
    // Hash Passwords
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    const data = new User({
        email: req.body.email,
        password: hashedPassword
    })
  
    const savedUser = await data.save();
    res.send(savedUser);
  });

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



//finds user

//@route    GET api/auth
//@desc     Test route
//@access   public
router.get('/login', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
// PUT route
router.put("/:id", async (req, res) => {});

// DELETE route
router.delete("/:id", async (req, res) => {});

module.exports = router;
