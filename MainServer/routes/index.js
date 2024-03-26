var express = require('express');
var router = express.Router();
var axios = require('axios'); // Assicurati di aver installato axios

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.send(giocatori[2]);
});

router.get('/test2', async (req, res) => {
  try {

    const response = await axios.get('http://localhost:8080/player?id=4042');
    const dati = response.data;
    res.send(dati);
  } catch (error) {
    console.error('Errore nella richiesta al server Spring Boot:', error);
    res.status(500).send('Errore nella richiesta al server Spring Boot');
  }
});

module.exports = router;
