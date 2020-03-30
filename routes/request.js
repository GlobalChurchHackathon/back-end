const express = require("express");
const router = express.Router();

const Request = require('../models/Request')

// GET route
router.get("/", async (req, res) => {
    const requests = await Request.find().sort("title");
    res.send(requests);
  });


// Post Route
  router.post('/', async (req, res) => {
    const data = new Request({
        title: req.body.title,
        description: req.body.description,
        isClaimed: req.body.isClaimed
    })
  
    const savedRequest = await data.save();
    res.send(savedRequest);
  });

  module.exports = router;