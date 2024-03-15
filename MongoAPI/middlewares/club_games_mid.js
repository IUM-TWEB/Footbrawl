const queries = require("../queries/club_games_queries");

module.exports.getByGame = async (req, res) => {
    await queries.getByClub(req.params.game)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

module.exports.getByClub = async (req, res) => {
    await queries.getByClub(req.params.club)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}

module.exports.getByClubAndHosted = async (req, res) => {
    await queries.getByClub(req.params.club, req.params.hosted)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => {
            console.log(err)
            res.send(err.name)
        })
}