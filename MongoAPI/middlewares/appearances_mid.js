const queries = require('../queries/appearances_queries')

const getById = (req, res) => {

    queries.getById(req.params.id)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

const getByPlayer = (req, res) => {
    console.log(req.params)
    queries.getByPlayer(parseInt( req.params.player))
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

const getByGame = async (req, res) => {
    await queries.getByGame(req.params.game_id)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

const getByGP = (req, res) => {
    console.log(req.params)
    queries.getByGP(parseInt(req.params.game_id), parseInt(req.params.player_id))
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}
module.exports = {getById, getByGame, getByPlayer, getByGP}