const express = require('express')

const router = express.Router();

// Static Routes
router.get("/", (req, res) => {
  return res.send("Received a GET HTTP method");
});
router.post("/", (req, res) => {
  return res.send("Received a POST HTTP method");
});
router.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});
router.patch("/", (req, res) => {
  return res.send("Received a PATCH HTTP method");
});
router.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

module.exports = router;
