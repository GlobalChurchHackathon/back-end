const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


const User = require("../models/User");

// GET route
router.get("/", async (req, res) => {
  const users = await User.find().sort("email");
  res.send(users);
});

//POST route
router.post('/', async (req, res) => {
  // Hash Passwords
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);

  const data = new User({
      email: req.body.email,
      password: hashedPassword
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

  const savedUser = await data.save();
  res.send(savedUser);
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

/*
@route    POST api/auth
@desc     Authenticate user & get token
@access   public */

router.post(
    "/login",
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    //this is the responds
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //does the user exists?
            let user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid email or password' }] });
            }

            /*  does the email & password match the user.id? 
                comparing plain text to encrypted 
            */
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid email or password' }] });
            }

            //return jsw
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
// PUT route
router.put("/:id", async (req, res) => {});

// DELETE route
router.delete("/:id", async (req, res) => {});

module.exports = router;
