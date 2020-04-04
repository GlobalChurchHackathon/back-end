const express = require('express');
const connectDB = require('./config/db');
// const http = require('http');
// const app = require('./app');
const port = process.env.PORT || 5000;
// const server = http.createServer(app);

//heroku deployment
const path = require('path')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('front-end'))
}

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//define routes
app.use('/auth', require('./routes/auth'))
app.use('/church', require('./routes/church'))
app.use('/profile', require('./routes/profile'))
app.use('/request', require('./routes/request'))
app.use('/user', require('./routes/user'))


const PORT = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));
