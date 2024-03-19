const ctrl = require('../middlewares/club_games_mid')

const express = require('express')
const router = express.Router()

router.get('/:game', ctrl.getByGame)
router.get('/club/:club', ctrl.getByClub)
router.get('/club/:club/:isHosted', ctrl.getByClubAndHosted)

module.exports = router