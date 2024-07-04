const lineup = require('../models/game_lineups')
const getById = (id) => {
    console.log(id)
    return lineup.find({_id: id}, {}, null)
}

const getByPlayer = (player) => {
    return lineup.find({player_id:player}, {}, null)
}

const getByClub = (club) => {
    return lineup.find({club_id: club}, {}, null)
}

const getByPlayerAndPosition = (player, position) => {
    return lineup.find({player_id:player, position: position}, {}, null)
}

module.exports = {getByPlayer, getByClub, getById, getByPlayerAndPosition}