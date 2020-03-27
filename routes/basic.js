const router = require("express").Router()

//Create
//Read
//Update
//Delete

// Get Routes (Read) 
router.get("/", (req, res) => {
  return res.send("Received a GET HTTP method");
});

// Post Routes (Create)
router.post("/", (req, res) => {
  return res.send("Received a POST HTTP method");
});

// Put & Patch Routes (Update)
router.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});

router.patch("/", (req, res) => {
  return res.send("Received a PATCH HTTP method");
});

// Delete Routes (Delete)
router.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

module.exports = router;
