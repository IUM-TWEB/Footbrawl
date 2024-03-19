const mongoose = require('mongoose')

const club_games = new mongoose.Schema({
    club_games_id: Number,
    game_id:Number,
    club_id:Number,
    own_goals:Number,
    own_position:Number,
    own_manager_name:String,
    opponent_id:Number,
    opponent_goals:Number,
    opponent_position: Number,
    opponent_manager_name: String,
    hosting:String,
    is_win: Number,
})

module.exports = mongoose.model('clubs_games', club_games)