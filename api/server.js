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
  const newUser = db.insert({
    id: db.shortid.generate(),
    name: req.body.name,
    bio: req.body.bio
  })
  newUser
  .then(() => {
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
  const users = db.find()
  users
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
  const users = db.findById(req.params.id)
  users
  .then((users) => {
    if (req.params.id){
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
  const users = db.findById(req.params.id)
  users
  .then((user) => {
    if(req.params.id){
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
server.put("/api/users/:id", async (req, res) => {
  const users = await db.find()

  if (!req.params.id) {
    return res.status(404).json({
      message: "The user with the specified ID does not exist"
    })
  } else if (!req.body.name || !req.body.bio){
    return res.status(400).json({
      message: "Please provide name and bio for the user",
    })  
  }
  // console.log(users)
  db.update(users[req.params.id-1].id, {
    name: req.body.name,
    bio: req.body.bio,
  })
  .then((updatedUser) => {
    console.log(updatedUser)
      res.status(200).json(updatedUser)
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
