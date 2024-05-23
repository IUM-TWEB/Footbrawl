const express = require('express');
const axios = require('axios')
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/log', async (req,res)=>{
  try {
    const response = await axios.post(`http://localhost:3001/user/log/`, {username:req.body.username, pwd:req.body.pwd})
    if(Array.isArray(response.data) &&  response.data.length)
      res.send("1")
    res.send("0")
  } catch (err) {
    console.log(err)
    res.send(err.name)
  }
})

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const exist = await axios.post(`http://localhost:3001/user/log`, {username:req.body.username, pwd:req.body.pwd})

    console.log(exist.data);
    if (Array.isArray(exist.data) && !exist.data.length) {
      const newUser = await axios.post(`http://localhost:3001/user`,{username:req.body.username, pwd:req.body.pwd});
      res.send(newUser.data);
    } else {
      res.send("already");
    }
  } catch (err) {
    console.log(err)
    res.send(err.name);
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
