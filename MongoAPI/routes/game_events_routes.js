const mid = require("../middlewares/game_events_mid")

const express = require('express')
const router = express.Router()

router.get('/:id', mid.getById)

router.get('/player/:player_id', mid.getByPlayer)

router.get('/player_in/:player_in', mid.getDatesByPlayerIn)

router.get('/club/:club_id', mid.getByClub)

module.exports = router