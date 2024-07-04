const games = require('../models/club_games')
const getByGame = (game) => {
    return games.find({club_games_id: game}, {}, null)
}

const getByClub = (club) => {
    return games.find({$or: [{club_id: club}, {opponent_id: club}]}, {}, null)
}

const getByGameAndHosted = (club, isHosted) => {
    return games.find({$or: [{club_id: club}, {opponent_id: club}], hosting: isHosted}, {}, null)
}

module.exports = {getByClub, getByGameAndHosted, getByGame}