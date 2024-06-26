let express = require('express');
let router = express.Router();
let axios = require('axios');


router.get('/:id', async (req, res) => {
  try {
    const response = (await axios.get(`http://localhost:8080/club?id=${req.params.id}`)).data;
    res.send(response.data);
  } catch (err) {
    console.log(err)
    res.status(500).send('Il main server non risponde');
  }
})

module.exports = router;
