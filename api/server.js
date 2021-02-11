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
    name: req.body.name,
    bio: req.body.bio
  })
  if (!req.body.name || !req.body.bio){
    res.status(400).json({
      message: "Please provide name and bio for the user",
    })
  } else if (!newUser){
    res.status(500).json({
      message: "There was an error while saving the user to the database"
    })
  } else {
    res.status(201).json(newUser)
  }
})

//GET
server.get("/api/users", (req, res) => {
  const users = db.find()
  if (users) {
    res.json(users)
  } else {
    res.status(500).json({
      message: "The user information could not be retrieved"
  })
}
})

//GET

//DELETE

//PUT

module.exports = server;
// EXPORT YOUR SERVER instead of {}
