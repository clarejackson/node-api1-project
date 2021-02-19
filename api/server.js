// BUILD YOUR SERVER HERE
const express = require("express")
const db = require("./users/model")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Hello, World" })
})

//POST 
server.post("/api/users", (req, res) => {
  db.insert({
    name: req.body.name,
    bio: req.body.bio
  })
  .then((newUser) => {
    if (!req.body.name || !req.body.bio){
     return res.status(400).json({
      message: "Please provide name and bio for the user",
    })  
  } else {
    res.status(201).json(newUser)
  }
})
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "There was an error while saving the user to the database"
      })
    })
  
})

//GET
server.get("/api/users", (req, res) => {
  db.find()
  .then((users) => {
    res.json(users)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "The user information could not be retrieved"
  })
  })
});

//GET
server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
  .then((users) => {
    if (users){
      res.json(users)
    } else {
      res.status(404).json({
      message: "The user with the specified ID does not exist"
    })
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      message: "The user information could not be retrieved"
    })
  })
})

//DELETE
server.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
  .then((user) => {
    if(user){
      res.json(user)
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist"
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "The user could not be removed"
    })
  })
})

//PUT
server.put("/api/users/:id", (req, res) => {
  if (!req.body.name || !req.body.bio){
    return res.status(400).json({
      message: "Please provide name and bio for the user",
    })  
  }
  db.update(req.params.id, {
    name: req.body.name,
    bio: req.body.bio,
  })
  .then((updatedUser) => {
    console.log(updatedUser)
    if(updatedUser){
      res.status(200).json(updatedUser)
    } else {
      res.status(404).json({
            message: "The user with the specified ID does not exist"
          })
    }    
    })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "The user information could not be modified"
    })
  })
  })
  

module.exports = server

// EXPORT YOUR SERVER instead of {}
