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

router.post('/favplayer', async (req, res) => {
  try {
    const response = await axios.post("http://localhost:3001/user/fav/player", req.body);
    res.send(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Errore nel server'});
  }
});

router.post('/favteam', async (req, res) => {
  try {
    const response = await axios.post("http://localhost:3001/user/fav/team", req.body);
    res.send(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Errore nel server'});
  }
});

router.post('/getfav', async (req, res) => {
  console.log(req.body);
  try {
    const response = await axios.post(`http://localhost:3001/user/getfav/`, {
      username: req.body.username,
      pwd: req.body.pwd
    })
    res.send(response.data)
  } catch (e) {
    res.sendStatus(500)
  }
})

router.post('/postFormations', async (req, res) => {
  try {
    const response = await axios.post(`http://localhost:3001/user/fav/formation`, {
      username: req.body.username,
      pwd: req.body.pwd,
      formation: req.body.formation,
    })

    res.send(response.data)
  } catch (e) {
    res.sendStatus(500)
  }
})

router.post('/getFormations', async (req, res) => {
  try {
    const resp = await axios.post('http://localhost:3001/user/getfav/formation', {
      username: req.body.username,
      pwd: req.body.pwd,
    })
    res.send(resp.data)
  } catch (e) {
    res.sendStatus(500)
  }
})

router.post('/removePlayer', async (req,res)=>{
  try {
    const response = await axios.post("http://localhost:3001/user/fav/removePlayer", req.body);
    res.send(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Errore nel server'});
  }
})

router.post('/removeTeam', async (req,res)=>{
  try {
    const response = await axios.post("http://localhost:3001/user/fav/removeTeam", req.body);
    res.send(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Errore nel server'});
  }
})
module.exports = router;
