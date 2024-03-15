const ctrl = require('../middlewares/games_mid')
const express = require('express')

const router = express.Router()


/**/
router.get('/:id', ctrl.getById)
/**/
router.get('/:comp/:season', ctrl.getBySeasonAndComp)
/**/
router.get('/:comp/:season/:game_id', ctrl.getByClub)



module.exports = router