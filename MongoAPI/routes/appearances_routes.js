const mid = require('../middlewares/appearances_mid')

const express = require('express')
const router = express.Router()

/**/
router.get('/:id', mid.getById )

/**/
router.get('/game/:game_id', mid.getByGame)

/**/
router.get('/gp/:game_id/:player_id/', mid.getByGP)

/**/
router.get('/player/:player_id/', mid.getByPlayer)


module.exports = router