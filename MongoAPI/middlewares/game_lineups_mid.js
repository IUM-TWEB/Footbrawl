const queries = require('../queries/game_lineups_queries')

const getById = (req,res)=>{
     queries.getById(req.params.id)
        .then(resp => {
            res.send(resp)
        })
        .catch(e => {
            console.log(e)
            res.send(e.name)
        })
}

const getByPlayer = async (req,res)=>{
    await queries.getByPlayer(req.params.player)
        .then(resp => {
            res.send(resp)
        })
        .catch(e=>{
            res.send(e.name)
        })
}

const getByClub = async (req,res) => {
    await queries.getByClub(req.params.club)
        .then(resp => {
            res.send(resp)
        })
        .catch(e => {
            res.send(e.name)
        })
}

const getByPlayerAndPosition = async (req,res) => {
    await queries.getByPlayerAndPosition(req.params.player, req.params.pos)
        .then(resp => {
            res.send(resp)
        })
        .catch(e => {
            res.send(e)
        })
}

module.exports = {getById, getByPlayer, getByClub, getByPlayerAndPosition}