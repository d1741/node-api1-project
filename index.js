// implement your API here


const express = require('express');
//the following pulls in the information from the dummy database
const database = require('./data/db');

const server = express();

//initial get request to test the server on insomnia
server.get('/api', (req, res) => {
    res.send("<h1>This is my first time.</h1>");
})

//get array of user objects using find() method and GET:
server.get('/api/users', (req, res) => {
    database.find()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(error => {
                res.status(500).json({message: "error getting list of users"})
            })
})

//get user object by specific id using findById() method and GET:
server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    database.findById(userId)
            .then(user => {
                console.log("user found by ID")
                res.status(200).json(user)
            })
            .catch(error => {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            })
})



//told the server to listen on port 4000 for changes and gave a message for me to know whether or not it's working
const port = 4000;
server.listen(port, () => console.log('The API is running'));