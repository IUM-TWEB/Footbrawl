const ctrl = require('../middlewares/games_mid')
const express = require('express')

const router = express.Router()

/*trova l ultima partita di una competizione*/
router.get('/last_game/:comp', ctrl.getByCompLast)
/**/
router.get('/position/:club_id', ctrl.getPosition)
/**/
router.get('/:id', ctrl.getById)
/**/
router.get('/:comp/:season', ctrl.getBySeasonAndComp)
/**/

router.get('/:comp/:season/:game_id', ctrl.getByClub)

module.exports = router
