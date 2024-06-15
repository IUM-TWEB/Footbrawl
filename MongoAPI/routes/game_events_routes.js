const mid = require("../middlewares/game_events_mid")

const express = require('express')
const router = express.Router()

router.get('/:id', mid.getById)

router.get('/player/:player_id', mid.getByPlayer)

router.get('/player_goals_date/:player_id', mid.getGoalDatesById)

router.get('/player_assist_date/:player_id', mid.getAssistDatesByPlayerId)

router.get('/club/:club_id', mid.getByClub)

router.get('/top_scorer/:competition_id', mid.getTopScorer)

module.exports = router
