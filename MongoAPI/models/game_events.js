const mongoose = require('mongoose')

const game_events = new mongoose.Schema({

    game_event_id: String,
    date: Date,
    game_id: Number,
    minute: Number,
    type: String,
    club_id: Number,
    player_id: Number,
    description: String,
    player_in_id: Number,
    player_assist_id: Number

})

module.exports = mongoose.model('game_events', game_events)