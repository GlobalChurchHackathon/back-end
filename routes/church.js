const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const Church = require("../models/Church");

// GET route

router.get("/", async (req, res) => {
    const churches = await Church.find().sort("name");
    res.send(churches);
  });

// Post route - Add New User
router.post('/', async (req, res) => {
  
    let churches = await Church.findOne({ email: req.body.email })

    if(churches) {
      res.status(400).json({ errors: [ { msg: 'Church profile already exists'}] });
    }

    const church = new Church({
        name: req.body.name,
        email: req.body.email,
        website: req.body.website,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        socialMedia1: req.body.socialMedia1,
        socialMedia2: req.body.socialMedia2
    })
  
    const savedChurch = await church.save();
    res.send(savedChurch);
  });

  module.exports = router;
