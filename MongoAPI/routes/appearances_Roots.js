const ctrl = require('../middlewares/appearances_mid')

const express = require('express')
const router = express.Router()

/**/
router.get('/:id', ctrl.getById )

/**/
router.get('/games/:game_id', ctrl.getByGame)

/**/
router.get('/games/:game/:player/', ctrl.getByPlayer)


module.exports = router