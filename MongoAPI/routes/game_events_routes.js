const mid = require("../middlewares/game_events_mid")
const queries = require("../queries/game_events_queries")
const express = require('express')
const router = express.Router()


router.get('/club/:club_id', mid.getByClub)

router.get('/competition/:competition_id', async (req, res) => {
  const resp = await queries.test(req.params.competition_id)
  res.send(resp)
})

module.exports = router
