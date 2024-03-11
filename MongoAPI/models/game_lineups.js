const mongoose = require('mongoose')

const game_lineups = new mongoose.Schema({

    game_id: Number,
    club_id: Number,
    type: String,
    number: Number,
    player_id: Number,
    player_name: String,
    team_captain: Number,
    position: String

})

module.exports = mongoose.model('game_lineups', game_lineups)