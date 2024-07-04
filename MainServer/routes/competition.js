const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * @swagger
 * tags:
 *   name: Competitions
 *   description: Operazioni relative alle competizioni
 */

/**
 * @swagger
 * /ranking/{competition_name}:
 *   get:
 *     summary: Get the latest competition ranking by name
 *     description: Returns the ranking of the latest competition based on the specified competition name. This endpoint makes a request to the Postgres server to get the ranking for the competition with the name `competition_name` for the most recent year for which data is available.
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: competition_name
 *         required: true
 *         description: Name of the competition to get the ranking for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Latest competition ranking
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ranking_id:
 *                     type: integer
 *                     description: Unique identifier for the ranking entry
 *                   club_id:
 *                     type: integer
 *                     description: Unique identifier for the club
 *                   position:
 *                     type: integer
 *                     description: Position of the club in the ranking
 *                   season:
 *                     type: integer
 *                     description: Season year of the ranking
 *                   competition_id:
 *                     type: string
 *                     description: Identifier of the competition
 *                   club_name:
 *                     type: string
 *                     description: Name of the club
 *                   competition_name:
 *                     type: string
 *                     description: Name of the competition
 *       500:
 *         description: Error in the request to the Postgres server
 */
router.get('/ranking/:competition_name', async (req, res) => {
  /*controllare se questa route viene usata o meno*/
  try {
    const response = (await axios.get(`http://localhost:8080/lastCompetitionRankingByCompetitionName?name=${req.params.competition_name}`)).data;
    res.send(response);
  } catch (error) {
    res.status(500).send('Error in the request to the Postgres server');
  }
});

/**
 * @swagger
 * /rankingId/{id_campionato}:
 *   get:
 *     summary: Get the latest competition ranking by ID
 *     description: Returns the ranking of the latest competition based on the specified competition ID. This endpoint makes a request to the Postgres server to retrieve the ranking data.
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id_campionato
 *         required: true
 *         description: ID of the competition to get the ranking for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Latest competition ranking
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ranking_id:
 *                     type: integer
 *                     description: Unique identifier for the ranking entry
 *                   club_id:
 *                     type: integer
 *                     description: Unique identifier for the club
 *                   position:
 *                     type: integer
 *                     description: Position of the club in the ranking
 *                   season:
 *                     type: integer
 *                     description: Season year of the ranking
 *                   competition_id:
 *                     type: string
 *                     description: Identifier of the competition
 *                   club_name:
 *                     type: string
 *                     description: Name of the club
 *                   competition_name:
 *                     type: string
 *                     description: Name of the competition
 *       500:
 *         description: Error in the request to the Postgres server
 */
router.get('/rankingId/:id_campionato', async (req, res) => {
  const idCampionato = req.params.id_campionato;
  const url = `http://localhost:8080/lastCompetitionRankingByCompetitionId?id=${idCampionato}`;
  try {
    const response = await axios.get(url);
    const rankingData = response.data;
    res.send(rankingData);
  } catch (error) {
    console.error('Error in the request to the Postgres server:', error);
    res.status(500).send('Error in the request to the Postgres server');
  }
});

/**
 * @swagger
 * /details/{id_competition}:
 *   get:
 *     summary: Get competition details by ID
 *     description: Returns the competition details based on the specified competition ID. This endpoint makes a request to the Postgres server to retrieve the competition data.
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id_competition
 *         required: true
 *         description: ID of the competition to get the details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Competition details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 competitionId:
 *                   type: string
 *                   description: Unique identifier for the competition
 *                 name:
 *                   type: string
 *                   description: Name of the competition
 *                 type:
 *                   type: string
 *                   description: Type of the competition
 *                 countryName:
 *                   type: string
 *                   description: Name of the country where the competition is held
 *                 domesticLeagueCode:
 *                   type: string
 *                   description: Code of the domestic league
 *                 confederation:
 *                   type: string
 *                   description: Confederation of the competition
 *                 url:
 *                   type: string
 *                   description: URL to the competition's profile on Transfermarkt
 *       500:
 *         description: Error in the request to the Postgres server
 */
router.get('/details/:id_competition', async (req, res) => {
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

/**
 * @swagger
 * /top_scorer/{competition_id}:
 *   get:
 *     summary: Get the top scorers of a competition
 *     description: Retrieves the top scorers of a competition based on the specified competition ID. This endpoint makes a request to the MongoDB server to get the top scorers and then requests additional player details from the Postgres server.
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: competition_id
 *         required: true
 *         description: ID of the competition to get the top scorers for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of top scorers with details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   totalGoals:
 *                     type: integer
 *                     description: Number of goals scored
 *                   player_id:
 *                     type: integer
 *                     description: Player ID
 *                   firstName:
 *                     type: string
 *                     description: First name of the player
 *                   lastName:
 *                     type: string
 *                     description: Last name of the player
 *                   name:
 *                     type: string
 *                     description: Full name of the player
 *                   age:
 *                     type: integer
 *                     description: Age of the player
 *                   marketValue:
 *                     type: number
 *                     description: Current market value of the player
 *                   highestMarketValue:
 *                     type: number
 *                     description: Highest market value of the player
 *                   lastSeason:
 *                     type: integer
 *                     description: Last season the player was active
 *                   currentClubId:
 *                     type: integer
 *                     description: ID of the player's current club
 *                   countryOfBirth:
 *                     type: string
 *                     description: Country of birth of the player
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     description: Date of birth of the player
 *                   position:
 *                     type: string
 *                     description: Position of the player
 *                   foot:
 *                     type: string
 *                     description: Preferred foot of the player
 *                   heightInCm:
 *                     type: integer
 *                     description: Height of the player in centimeters
 *                   imageUrl:
 *                     type: string
 *                     description: URL of the player's image
 *                   currentClubDomesticCompetitionId:
 *                     type: string
 *                     description: ID of the domestic competition of the player's current club
 *                   currentClubName:
 *                     type: string
 *                     description: Name of the player's current club
 *       500:
 *         description: Error in the request to the MongoDB server
 */
router.get('/top_scorer/:competition_id', async (req, res) => {
  try {
    const competitionId = req.params.competition_id;
    const response = (await axios.get(`http://localhost:3001/events/top_scorer/${competitionId}`)).data;
    const topScorerData = response.data;

    const playerDetailsPromises = topScorerData.map(async (player) => {
      try {
        const playerResponse = await axios.get(`http://localhost:8080/player?id=${player.player_id}`);
        const playerDetails = playerResponse.data;
        const {
          playerId,
          ...otherDetails
        } = playerDetails;
        return {
          ...player,
          ...otherDetails
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

/**
 * @swagger
 * /last_game/{competition_id}:
 *   get:
 *     summary: Get the last game of a competition
 *     description: Returns the details of the last game based on the specified competition ID. This endpoint makes a request to the MongoDB server to retrieve the game data.
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: competition_id
 *         required: true
 *         description: ID of the competition to get the last game for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Last game details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   description: Unique identifier for the game
 *                 competition_id:
 *                   type: string
 *                   description: ID of the competition
 *                 season:
 *                   type: integer
 *                   description: Season year
 *                 round:
 *                   type: string
 *                   description: Round of the competition
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Date of the game
 *                 home_club_id:
 *                   type: integer
 *                   description: ID of the home club
 *                 away_club_id:
 *                   type: integer
 *                   description: ID of the away club
 *                 home_club_goals:
 *                   type: integer
 *                   description: Goals scored by the home club
 *                 away_club_goals:
 *                   type: integer
 *                   description: Goals scored by the away club
 *                 home_club_manager_name:
 *                   type: string
 *                   description: Name of the home club manager
 *                 away_club_manager_name:
 *                   type: string
 *                   description: Name of the away club manager
 *                 stadium:
 *                   type: string
 *                   description: Name of the stadium
 *                 referee:
 *                   type: string
 *                   description: Name of the referee
 *                 url:
 *                   type: string
 *                   description: URL to the game details
 *                 home_club_formation:
 *                   type: string
 *                   description: Formation of the home club
 *                 away_club_formation:
 *                   type: string
 *                   description: Formation of the away club
 *                 home_club_name:
 *                   type: string
 *                   description: Name of the home club
 *                 away_club_name:
 *                   type: string
 *                   description: Name of the away club
 *                 aggregate:
 *                   type: string
 *                   description: Aggregate score of the game
 *                 competition_type:
 *                   type: string
 *                   description: Type of the competition
 *       500:
 *         description: Error in the request to the MongoDB server
 */
router.get('/last_game/:competition_id', async (req, res) => {
  try {
    const response = (await axios.get(`http://localhost:3001/games/last_game/${req.params.competition_id}`)).data;
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});

/**
 * @swagger
 * /last_game_by_club/{club_id}:
 *   get:
 *     summary: Get the last game of a club
 *     description: Returns the details of the last game of a club based on the specified club ID. This endpoint makes a request to the MongoDB server to retrieve the game data.
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: club_id
 *         required: true
 *         description: ID of the club to get the last game for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Last game details of the club
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   description: Unique identifier for the game
 *                 competition_id:
 *                   type: string
 *                   description: ID of the competition
 *                 season:
 *                   type: integer
 *                   description: Season year
 *                 round:
 *                   type: string
 *                   description: Round of the competition
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Date of the game
 *                 home_club_id:
 *                   type: integer
 *                   description: ID of the home club
 *                 away_club_id:
 *                   type: integer
 *                   description: ID of the away club
 *                 home_club_goals:
 *                   type: integer
 *                   description: Goals scored by the home club
 *                 away_club_goals:
 *                   type: integer
 *                   description: Goals scored by the away club
 *                 home_club_manager_name:
 *                   type: string
 *                   description: Name of the home club manager
 *                 away_club_manager_name:
 *                   type: string
 *                   description: Name of the away club manager
 *                 stadium:
 *                   type: string
 *                   description: Name of the stadium
 *                 referee:
 *                   type: string
 *                   description: Name of the referee
 *                 url:
 *                   type: string
 *                   description: URL to the game details
 *                 home_club_formation:
 *                   type: string
 *                   description: Formation of the home club
 *                 away_club_formation:
 *                   type: string
 *                   description: Formation of the away club
 *                 home_club_name:
 *                   type: string
 *                   description: Name of the home club
 *                 away_club_name:
 *                   type: string
 *                   description: Name of the away club
 *                 aggregate:
 *                   type: string
 *                   description: Aggregate score of the game
 *                 competition_type:
 *                   type: string
 *                   description: Type of the competition
 *       500:
 *         description: Error in the request to the MongoDB server
 */
router.get('/last_game_by_club/:club_id', async (req, res) => {
  const clubId = req.params.club_id;
  const url = `http://localhost:3001/games/last_game_club/${clubId}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});

/**
 * @swagger
 * /top_market_value/{competition_id}:
 *   get:
 *     summary: Get players with the highest market value of a competition
 *     description: Returns players with the highest market value based on the specified competition ID. This endpoint makes a request to the Postgres server to retrieve the player data.
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: competition_id
 *         required: true
 *         description: ID of the competition to get players with the highest market value
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of players with the highest market value
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   playerId:
 *                     type: integer
 *                     description: Player ID
 *                   firstName:
 *                     type: string
 *                     description: Player's first name
 *                   lastName:
 *                     type: string
 *                     description: Player's last name
 *                   name:
 *                     type: string
 *                     description: Player's full name
 *                   age:
 *                     type: integer
 *                     description: Player's age
 *                   marketValue:
 *                     type: number
 *                     description: Player's market value
 *                   highestMarketValue:
 *                     type: number
 *                     description: Player's highest market value
 *                   lastSeason:
 *                     type: integer
 *                     description: Last season the player was active
 *                   currentClubId:
 *                     type: integer
 *                     description: Player's current club ID
 *                   countryOfBirth:
 *                     type: string
 *                     description: Player's country of birth
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     description: Player's date of birth
 *                   position:
 *                     type: string
 *                     description: Player's position
 *                   foot:
 *                     type: string
 *                     description: Player's preferred foot
 *                   heightInCm:
 *                     type: integer
 *                     description: Player's height in centimeters
 *                   imageUrl:
 *                     type: string
 *                     description: URL to the player's image
 *                   currentClubDomesticCompetitionId:
 *                     type: string
 *                     description: ID of the domestic competition of the player's current club
 *                   currentClubName:
 *                     type: string
 *                     description: Name of the player's current club
 *       500:
 *         description: Error in the request to the Postgres server
 */
router.get('/top_market_value/:competition_id', async (req, res) => {
  const competitionId = req.params.competition_id;
  const url = `http://localhost:8080/topMarketPlayerCompetition?competitionId=${competitionId}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});

module.exports = router;
