const queries = require('../models/game_events')
const getById = (id) => {
    return queries.find({_id: id}, {}, null)
}

const getByPlayer = (player) => {
    return queries.find({player_id: player}, {}, null)
}

const getByClub = (club) => {
    return queries.find({club_id: club}, {}, null)
}

const getGoalDatesByPlayerIn = (player_in) => {
    return queries.find({player_in_id: player_in}, {
        _id: 0,
        game_id: 0,
        minute: 0,
        type: 0,
        club_id: 0,
        player_id: 0,
        description: 0,
        player_in_id: 0,
        player_assist_id: 0,
    }, null)
}
module.exports = {getByPlayer, getByClub, getById, getGoalDatesByPlayerIn}