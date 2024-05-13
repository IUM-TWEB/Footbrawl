let express = require('express');
let axios = require('axios')
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/log/:name/:pwd', async (req,res)=>{
  try {
    const response = await axios.get(`http://localhost:3001/user/log/${req.params.name}/${req.params.pwd}`)
    res.send(response.data)
  } catch (err) {
    res.send(err.name)
  }
})

router.post('/:name/:pwd', async (req, res) => {
  try {
    const exist = await axios.get(`http://localhost:3001/user/log/${req.params.name}/${req.params.pwd}`);
    console.log(exist.data);
    if (Array.isArray(exist.data) && !exist.data.length) {
      const newUser = await axios.post(`http://localhost:3001/user/${req.params.name}/${req.params.pwd}`);
      console.log(newUser.data);
      res.send(newUser.data);
    } else {
      res.send("already");
    }
  } catch (err) {
    res.send(err.name);
  }
});

module.exports = router;
