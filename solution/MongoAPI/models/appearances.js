const mongoose = require('mongoose')

const appearances = new mongoose.Schema({
    _id: String,
    game_id: Number,
    player_id: Number,
    player_club_id: Number,
    player_current_club_id: Number,
    date: Date,
    player_name: String,
    competition_id: String,
    yellow_cards: Number,
    red_cards: Number,
    goals: Number,
    assists: Number,
    minutes_played: Number
})

module.exports = mongoose.model('appearances', appearances)