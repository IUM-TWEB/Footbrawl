const mid = require('../middlewares/user_mid')

const express = require('express')
const router = express.Router()
/**/
router.get('/:ciao', (req,res)=>{
    res.send("ci siamo")
    console.log(req.params.ciao)
})
/**/
router.get('/log/:name/:pwd/', mid.getUsr )

/**/
router.post('/:name/:pwd', mid.postUsr)


module.exports = router