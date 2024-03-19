const queries = require('../models/game_events')
const getById = (id) => {
    return queries.find({_id: id}, {}, null)
}

const getByPlayer = (player) => {
    return queries.find({player_id:player}, {}, null)
}

const getByClub = (club) => {
    return queries.find({club_id: club}, {}, null)
}

module.exports = {getByPlayer, getByClub, getById}