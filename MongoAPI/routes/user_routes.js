const mid = require('../middlewares/user_mid')

const express = require('express')
const router = express.Router()

/**/
router.post('/log/', mid.getUsr )

/**/
router.post('/', mid.postUsr)

router.post('/ex/', mid.getUsrByName)

module.exports = router