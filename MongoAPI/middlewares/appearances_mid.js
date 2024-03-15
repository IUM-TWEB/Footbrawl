const queries = require('../queries/appearances_queries')

const getById = async (req, res) => {
    console.log(req.params)

    await queries.getById(req.params.id)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

const getByPlayer = async (req, res) => {

    await queries.getByPlayer(req.params.game, req.params.player, req.params.date)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

const getByGame = async (req, res, next) => {
    console.log("its me")
    await queries.getByGame(req.params.game_id)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
    // next()
}

const getByGP = async (req, res) => {
    await queries.getByGP(req.params.game_id, req.params.player_id)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}
module.exports = {getById, getByGame, getByPlayer, getByGP}