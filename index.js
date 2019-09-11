// implement your API here


const express = require('express');
//the following pulls in the information from the dummy database
const database = require('./data/db');

const server = express();

//initial get request to test the server on insomnia
server.get('/', (req, res) => {
    res.send("<h1>This is my first time.</h1>");
})

//told the server to listen on port 4000 for changes and gave a message for me to know whether or not it's working
const port = 4000;
server.listen(port, () => console.log('The API is running'));