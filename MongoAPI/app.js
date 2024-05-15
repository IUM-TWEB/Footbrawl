// initialize the connection with the mongo database
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const appearances = require('./routes/appearances_routes')
const games = require('./routes/games_routes')
const club_games = require('./routes/clubgames_routes')
const lineups = require('./routes/game_lineups_routes')
const events = require('./routes/game_events_routes')
const news = require('./routes/news_routes')
mongoose.connect('mongodb://localhost:27017/footbrawl').then(()=>console.log("Connected to mongoDB/footbrawl"))
const db = mongoose.connection
db.once('connection', () => {
    console.log("eccoci")
})
db.on('error', (e) => {
    console.log(e)
})

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

server.use('/app', appearances)
server.use('/games', games)
server.use('/clubgames', club_games)
server.use('/lineups', lineups )
server.use('/events', events)
server.use('/news', news)
