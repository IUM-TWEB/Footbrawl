const express = require('express');
const axios = require('axios')
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/log', async (req, res) => {
    try {
        console.log(req.body)
        const response = await axios.post(`http://localhost:3001/user/log/`, req.body)
        console.log(response.data)
        if (Array.isArray(response.data) && response.data.length)
            res.send("1")
        else
            res.send("0")
    } catch (err) {
        console.log(err)
        res.send(err.name)
    }
})

router.post('/', async (req, res) => {
    try {
        const exist = await axios.post(`http://localhost:3001/user/ex`, req.body)

        console.log(exist.data);
        if (Array.isArray(exist.data) && !exist.data.length) {
            const newUser = await axios.post(`http://localhost:3001/user`, req.body);
            res.send("1");
        } else {
            res.send("0");
        }
    } catch (err) {
        res.send("-1");
    }
});

router.post('/favplayer', (req,res) => {
    try{
        axios.post("http://localhost:3001/user/fav/player", req.body)
          .then(resp => {
              res.send(resp.data)
          })
          .catch(e => {
              res.send(e.name)
          })
    }catch (e){


    }
})

module.exports = router;
