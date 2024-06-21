const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/ranking/:competition_name', async (req, res) => {
  const competitionName = req.params.competition_name;
  const url = `http://localhost:8080/lastCompetitionRankingByCompetitionName?name=${competitionName}`;
  try {
    const response = await axios.get(url);
    const rankingData = response.data;

    //console.log(rankingData);
    res.send(rankingData);
  } catch (error) {
    console.error('ERRORE nella richiesta al server Postgres:', error);
    res.status(500).send('Errore nella richiesta al server Postgres');
  }
});

router.get('/rankingId/:id_campionato', async (req, res) => {
  const idCampionato = req.params.id_campionato;
  const url = `http://localhost:8080/lastCompetitionRankingByCompetitionId?id=${idCampionato}`;
  console.log("entro");
  try {
    const response = await axios.get(url);
    const rankingData = response.data;

    console.log(rankingData);
    res.send(rankingData);
  } catch (error) {
    console.error('ERRORE nella richiesta al server Postgres:', error);
    res.status(500).send('Errore nella richiesta al server Postgres');
  }
});

router.get('/home/news', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3001/news`);
    const newsArray = response.data;
    res.send(newsArray);
  } catch (error) {
    console.error('Error in MongoDB request:', error);
    res.status(500).send('Errore nella richiesta al server MongoDB');
  }
});
router.get('/home/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm;

  const urlPlayerById = `http://localhost:8080/player?id=${searchTerm}`;
  const urlPlayerByName = `http://localhost:8080/playerByName?name=${searchTerm}`;
  const urlCompetition = `http://localhost:8080/competition?id=${searchTerm}`;
  const urlClubByName = `http://localhost:8080/clubByName?name=${searchTerm}`;
  const urlCompetitionByName = `http://localhost:8080/competitionByName?name=${searchTerm}`;

  try {
    const [responseById, responseByName, responseCompetition, responseClubByName, responseCompetitionByName] = await Promise.all([
      axios.get(urlPlayerById).catch(err => ({error: err.response})),
      axios.get(urlPlayerByName).catch(err => ({error: err.response})),
      axios.get(urlCompetition).catch(err => ({error: err.response})),
      axios.get(urlClubByName).catch(err => ({error: err.response})),
      axios.get(urlCompetitionByName).catch(err => ({error: err.response}))
    ]);

    // Separate arrays for players, clubs, competitions
    const players = [];
    const clubs = [];
    const competitions = [];

    // Populate players array
    if (!responseById.error) {
      const dataById = Array.isArray(responseById.data) ? responseById.data : [responseById.data];
      players.push(...dataById);
    }
    if (!responseByName.error) {
      const dataByName = Array.isArray(responseByName.data) ? responseByName.data : [responseByName.data];
      players.push(...dataByName);
    }

    // Populate clubs array
    if (!responseClubByName.error) {
      const dataClubByName = Array.isArray(responseClubByName.data) ? responseClubByName.data : [responseClubByName.data];
      clubs.push(...dataClubByName);
    }

    // Populate competitions array
    if (!responseCompetition.error) {
      const dataCompetition = Array.isArray(responseCompetition.data) ? responseCompetition.data : [responseCompetition.data];
      competitions.push(...dataCompetition);
    }
    if (!responseCompetitionByName.error) {
      const dataCompetitionByName = Array.isArray(responseCompetitionByName.data) ? responseCompetitionByName.data : [responseCompetitionByName.data];
      competitions.push(...dataCompetitionByName);
    }

    // Check if there is any data to send
    if (players.length > 0 || clubs.length > 0 || competitions.length > 0) {
      res.send([players, clubs, competitions]); // Send an array of three arrays
    } else {
      res.status(404).send('Nessun dato disponibile');
    }
  } catch (error) {
    console.error('Errore imprevisto:', error);
    res.status(500).send('Errore imprevisto nelle chiamate API');
  }
});
router.get('/competitions/:id_competition', async (req, res) => {
  try {
    const id = req.params.id_competition;
    const response = await axios.get(`http://localhost:8080/competition?id=${id}`);
    const dati = response.data;
    res.send(dati);
  } catch (error) {
    console.error('Errore nella richiesta al server Spring Boot:', error);
    res.status(500).send('Errore nella richiesta al server Spring Boot');
  }
});
router.get('/home/news/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`http://localhost:3001/news/${id}`);
    const newsData = response.data;

    res.send(newsData);
  } catch (error) {
    console.error('ERRORE nella richiesta al server MongoDB:', error);
    res.status(500).send('Errore nella richiesta al server MongoDB');
  }
})

/*route per richiedere i top scorer, effettua prima una chiamata al server di postgres dove riceve
* id_gicoaotre e numero di goal, dopo di che per ogni id_gicoatore faccio una richiesta a mongo per avere tutte le info del giocatore*/
router.get('/campionati/top_scorer/:competition_id', async (req, res) => {
  try {
    const competitionId = req.params.competition_id;
    const response = await axios.get(`http://localhost:3001/events/top_scorer/${competitionId}`);
    const topScorerData = response.data;

    // Fetch details for each player and merge the information
    const playerDetailsPromises = topScorerData.map(async (player) => {
      try {
        const playerResponse = await axios.get(`http://localhost:8080/player?id=${player.player_id}`);
        const playerDetails = playerResponse.data;
        const {
          playerId, // Destructure and exclude playerId
          ...otherDetails // Capture the remaining details
        } = playerDetails;
        return {
          ...player,
          ...otherDetails // Merge remaining details without playerId
        };
      } catch (error) {
        console.error(`Errore nel recupero dei dettagli per il giocatore con ID ${player.player_id}:`, error);
        return {
          ...player,
          name: 'Nome non disponibile',
          age: null,
          marketValue: null,
          highestMarketValue: null,
          lastSeason: null,
          currentClubId: null,
          countryOfBirth: null,
          dateOfBirth: null,
          position: null,
          foot: null,
          heightInCm: null,
          imageUrl: null,
          currentClubDomesticCompetitionId: null,
          currentClubName: 'Nome del club non disponibile'
        };
      }
    });

    const detailedTopScorers = await Promise.all(playerDetailsPromises);

    res.send(detailedTopScorers);
  } catch (error) {
    console.error('ERRORE nella richiesta al server MongoDB:', error);
    res.status(500).send('Errore nella richiesta al server MongoDB');
  }
});

router.get('/last_game/:competition_id', async (req, res) => {
  const competitionId = req.params.competition_id;
  const url = `http://localhost:3001/games/last_game/${competitionId}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});



module.exports = router;
