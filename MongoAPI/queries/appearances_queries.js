const model = require('../models/appearances')

const getByGame = (game) => {
    console.log("simamo in gam3")

    return model.find({game_id: game}, {}, null)
}

const getById = (id) => {
    console.log("simamo in id")

    return model.find({_id: id}, {}, null)
}

const getByPlayer = (player) => {
    console.log("simamo in player")

    return model.find({player_id: player}, {}, null)
}

const getByGP = (game, player) => {
    console.log("simamo in gp")
    return model.find({game_id: game, player_id: player}, {}, null)
}
module.exports = {getByGame, getById, getByPlayer, getByGP,}