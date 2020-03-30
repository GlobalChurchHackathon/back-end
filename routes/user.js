const express = require("express");
const router = express.Router();
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

const User = require("../models/User");

// GET route
router.get("/", async (req, res) => {
  const users = await User.find().sort("email");
  res.send(users);
});

router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
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
          .json({ errors: [{ msg: "Invalid email or password" }] });
      }

      /*  does the email & password match the user.id? 
                comparing plain text to encrypted 
            */
      const isMatch = await bcyrpt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });
      }

      //return jsw
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;