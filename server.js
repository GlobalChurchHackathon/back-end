const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const path = require('path')

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('front-end'))
}

const PORT = process.env.PORT || 4000;

server.listen(port, () => console.log(`Server started on port ${port}`));
