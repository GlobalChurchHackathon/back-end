const express = require('express');
const router = express.Router();
const {  validationResult } = require('express-validator');

const Church = require("../models/Church");

// GET route

router.get("/", async (req, res) => {
    const churches = await Church.find().sort("name");
    res.send(churches);
  });

// Post route - Add New Church/Organizations
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

  // PUT route
  // router.put('/:id',  async (req, res) => {
  //   const { error } = validationResult(req.body);
  //   if(error) return res.status(400).send(error.details[0].message);
  //   const churches = await Church.findOneAndUpdate(
  //       req.body.user,
  //       {
  //           name: req.body.name,
  //           email: req.body.email,
  //           website: req.body.website,
  //           address1: req.body.address1,
  //           address2: req.body.address2,
  //           city: req.body.city,
  //           state: req.body.state,
  //           zipCode: req.body.zipCode,
  //           phoneNumber: req.body.phoneNumber,
  //           socialMedia1: req.body.socialMedia1,
  //           socialMedia2: req.body.socialMedia2
  //       },
  //   );
  //   if (!churches) return res.status(404).send("Invalid Credentials")
  //       await churches.save();
  //       res.send(churches);
  //   });
  


    router.put("/:id", (req, res) => {
      Church.findById(req.params.id)
      .then(church => {
          church.name = req.body.name;
          church.email = req.body.email;
          church.website = req.body.website;
          church.address1 = req.body.address1;
          church.address2 = req.body.address;
          church.city = req.body.city;
          church.state = req.body.state;
          church.zipCode = req.body.zipCode;
          church.phoneNumber = req.body.phoneNumber;
          church.socialMedia1 = req.body.socialMedia1;
          church.socialMedia2 = req.body.socialMedia2;

          church.save()
          .then(() => res.json('Church updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

  // DELETE route

  router.delete("/:id", async (req, res) => {
    Church.findByIdAndDelete(req.params.id)
    .then(() =>res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;
