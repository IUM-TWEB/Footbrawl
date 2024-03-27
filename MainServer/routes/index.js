var express = require('express');
var router = express.Router();
var axios = require('axios'); // Assicurati di aver installato axios

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:searchTerm', async (req, res) => {
  try {
    const word= req.params.searchTerm;
    const response = await axios.get(`http://localhost:8080/player?id=${word}`);
    const dati = response.data;
    res.send(dati);
  } catch (error) {
    console.error('Errore nella richiesta al server Spring Boot:', error);
    res.status(500).send('Errore nella richiesta al server Spring Boot');
  }
});


module.exports = router;
