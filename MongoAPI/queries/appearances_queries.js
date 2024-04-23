const model = require('../models/appearances')

const getByGame = (game) => {
    return model.find({game_id: game}, {}, null)
}

const getById = (id) => {
    return model.find({_id: id}, {}, null)
}

const getByPlayer = (player) => {
    return model.find({player_id: player}, {}, null)
}

const getByGP = (game, player) => {
    return model.find({game_id: game, player_id: player}, {}, null)
}
module.exports = {getByGame, getById, getByPlayer, getByGP,}