// implement your API here


const express = require('express');
//the following pulls in the information from the dummy database
const database = require('./data/db');

const server = express();
server.use(express.json());

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
                res.status(500).json( { error: "The users information could not be retrieved." })
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

//create a user using insert() and POST:
server.post('/api/users', (req, res) => {
    const userInformation = req.body;
    console.log('new user added: ', userInformation);
    database.insert(userInformation)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
})

//delete user with remove() and DELETE:
server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    database.remove(userId)
            .then(user => {
                res.status(200).json({message:"The user has been removed."})
            })
            .catch(error => {
                res.status(500).json({ error: "The user could not be removed" })
            })
})

//specific user is updated and modified doc is returned using update() and PUT:
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    database.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json({message: "User successfully updated: " ,updated})
            } else {
                res.status(400).json({error: "Please provide name and bio for the user."})
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
})

//told the server to listen on port 4000 for changes and gave a message for me to know whether or not it's working
const port = 4000;
server.listen(port, () => console.log('The API is running'));