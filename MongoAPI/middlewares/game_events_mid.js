const queries = require('../queries/game_events_queries')

const getById = (req,res)=>{
    console.log(req.params)
    queries.getById(req.params.id)
        .then(resp => {
            res.send(resp)
        })
        .catch(e => {
            res.send(e.name)
        })
}

const getByPlayer = (req,res)=>{
    queries.getByPlayer(req.params.player_id)
        .then(resp => {
            res.send(resp)
        })
        .catch(e=>{
            res.send(e.name)
        })
}

const getByClub = (req,res) => {
    queries.getByClub(req.params.club_id)
        .then(resp => {
            res.send(resp)
        })
        .catch(e => {
            res.send(e.name)
        })
}

module.exports = {getById, getByPlayer, getByClub}