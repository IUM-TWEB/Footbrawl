// initialize the connection with the mongo database
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

mongoose.connect('mongodb://localhost:2717/footbrawl').then(()=>console.log("Connected to mongoDB/footbrawl"))
const db = mongoose.connection
db.once('connection', () => {
    console.log("eccoci")
})
db.on('error', (e) => {
    console.log(e)
})

// Initialize the express server
const server = express()
server.use(bodyparser.json())
server.use(
    bodyparser.urlencoded({
        extended: true,
    }),
);
server.listen(3001, (e)=>{
    console.error(e)
}, ()=>{
    console.log('Server Listening on port 3001')
})