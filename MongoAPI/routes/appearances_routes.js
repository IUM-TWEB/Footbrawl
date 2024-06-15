const mid = require('../middlewares/appearances_mid')

const express = require('express')
const queries = require("../queries/appearances_queries");
const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const mongo_response = await queries.getById(req.params.id)
    console.log(mongo_response)
    if (Array.isArray(mongo_response) && mongo_response.length === 0) {
      res.send('no value found').sendStatus(390)
    }else{
      res.send(mongo_response).sendStatus(200)
    }
  } catch (e) {
    res.send(`internal server error:${e.name}`).sendStatus(500)
  }


})

router.get('/game/:game_id', async (req, res) => {
  try {
    const mongo_response = await queries.getByGame(req.params.game_id)
    console.log(mongo_response)
    if (Array.isArray(mongo_response) && mongo_response.length === 0) {
      res.send('no value found').sendStatus(390)
    }else{
      res.send(mongo_response).sendStatus(200)
    }
  } catch (e) {
    res.send(`internal server error:${e.name}`).sendStatus(500)
  }
})

/**/
router.get('/gp/:game_id/:player_id/', (req, res) => {
  queries.getByGP(parseInt(req.params.game_id), parseInt(req.params.player_id))
    .then((resp) => {
      res.send(resp)
    })
    .catch((err) => {
      console.log(err)
      res.send(err.name)
    })
})

/**/
router.get('/player/:player_id/', mid.getByPlayer)


module.exports = router