const queries = require('../queries/games_queries')


module.exports.getById = async (req, res) => {
    await queries.getById(req.params.id)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

module.exports.getBySeasonAndComp = async (req, res) => {
    await queries.getByComp(req.params.comp, req.params.season)
        .then(resp => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

module.exports.getByClub = async (req, res) => {
    await queries.getByClub(req.params.comp, parseInt(req.params.season), req.params.game_id)
        .then(resp => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

