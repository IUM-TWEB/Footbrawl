const mid = require("../middlewares/game_lineups_mid")

const express = require('express')
const router = express.Router()

router.get('/:id', mid.getById)

router.get('/player/:player', mid.getByPlayer)

router.get('/player/:player/:pos', mid.getByPlayerAndPosition)

router.get('/club/:club', mid.getByClub)

module.exports = router