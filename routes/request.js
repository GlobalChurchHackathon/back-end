const express = require("express");
const router = express.Router();

const Request = require('../models/Request')

// GET route
/* router.get("/", async (req, res) => {
    const requests = await Request.find().sort("title");
    res.send(requests);
  });
 */
// we need to provide the lng and lat from the user's location
const lng = -81.219300;
const lat = 41.453555;
const maxDist = 50000;

 router.get("/", function(req, res, next){
  Request.find({
    "location.coordinates":
      {
        $near :
        {
                $geometry: { type: "Point", coordinates: [lng,lat] },
                $maxDistance: maxDist
        }
      }
  }).then(function(requests){
    res.send(requests);
  })
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

// DELETE Route
router.delete("/:id", (req, res) => {
  Request.findByIdAndDelete(req.params.id)
  .then(() =>res.json('Request deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
})

  module.exports = router;