const router = require('express').Router;

// Static Routes
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
  });
  app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });
  app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
  });
  app.patch('/', (req, res) => {
    return res.send('Received a PATCH HTTP method');
  });
  app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });
  
  module.exports = router;