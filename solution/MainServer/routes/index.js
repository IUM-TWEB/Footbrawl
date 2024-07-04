const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Renders the main page
 *     description: Renders the main page.
 *     responses:
 *       200:
 *         description: Successfully rendered the page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/', function (req, res) {
  res.render('index');
});

/**
 * @swagger
 * /home/{searchTerm}:
 *   get:
 *     summary: Search for players, clubs, and competitions
 *     description: Searches for players, clubs, and competitions based on the specified search term.
 *                   This endpoint makes requests to postgress servers to retrieve data.
 *                   The returned object is organized as {10 players} {10 clubs} {10 competitions}.
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         required: true
 *         description: The term to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 players:
 *                   type: array
 *                   description: List of players
 *                   items:
 *                     type: object
 *                     properties:
 *                       playerId:
 *                         type: integer
 *                         description: Unique identifier for the player
 *                       firstName:
 *                         type: string
 *                         description: First name of the player
 *                       lastName:
 *                         type: string
 *                         description: Last name of the player
 *                       name:
 *                         type: string
 *                         description: Full name of the player
 *                       age:
 *                         type: integer
 *                         description: Age of the player
 *                       marketValue:
 *                         type: number
 *                         description: Current market value of the player
 *                       highestMarketValue:
 *                         type: number
 *                         description: Highest market value of the player
 *                       lastSeason:
 *                         type: integer
 *                         description: Last season the player was active
 *                       currentClubId:
 *                         type: integer
 *                         description: Current club ID of the player
 *                       countryOfBirth:
 *                         type: string
 *                         description: Country of birth of the player
 *                       dateOfBirth:
 *                         type: string
 *                         format: date
 *                         description: Date of birth of the player
 *                       position:
 *                         type: string
 *                         description: Position of the player
 *                       foot:
 *                         type: string
 *                         description: Preferred foot of the player
 *                       heightInCm:
 *                         type: integer
 *                         description: Height of the player in centimeters
 *                       imageUrl:
 *                         type: string
 *                         description: URL of the player's image
 *                       currentClubDomesticCompetitionId:
 *                         type: string
 *                         description: ID of the domestic competition of the current club
 *                       currentClubName:
 *                         type: string
 *                         description: Name of the current club
 *                 clubs:
 *                   type: array
 *                   description: List of clubs
 *                   items:
 *                     type: object
 *                     properties:
 *                       clubId:
 *                         type: integer
 *                         description: Unique identifier for the club
 *                       clubCode:
 *                         type: string
 *                         description: Code of the club
 *                       name:
 *                         type: string
 *                         description: Name of the club
 *                       domesticCompetitionId:
 *                         type: string
 *                         description: ID of the domestic competition
 *                       domesticCompetitionName:
 *                         type: string
 *                         description: Name of the domestic competition
 *                       squadSize:
 *                         type: integer
 *                         description: Size of the club's squad
 *                       averageAge:
 *                         type: number
 *                         description: Average age of the players in the club
 *                       foreignersNumber:
 *                         type: integer
 *                         description: Number of foreign players in the club
 *                       foreignersPercentage:
 *                         type: number
 *                         description: Percentage of foreign players in the club
 *                       nationalTeamPlayers:
 *                         type: integer
 *                         description: Number of national team players in the club
 *                       stadiumName:
 *                         type: string
 *                         description: Name of the club's stadium
 *                       stadiumSeats:
 *                         type: integer
 *                         description: Number of seats in the stadium
 *                       coachName:
 *                         type: string
 *                         description: Name of the club's coach
 *                       last_season:
 *                         type: integer
 *                         description: Last season the club was active
 *                       url:
 *                         type: string
 *                         description: URL to the club's profile on Transfermarkt
 *                       netTransferRec:
 *                         type: number
 *                         description: Net transfer record of the club
 *                       totalMarketVal:
 *                         type: number
 *                         description: Total market value of the club
 *                 competitions:
 *                   type: array
 *                   description: List of competitions
 *                   items:
 *                     type: object
 *                     properties:
 *                       competitionId:
 *                         type: string
 *                         description: Unique identifier for the competition
 *                       name:
 *                         type: string
 *                         description: Name of the competition
 *                       type:
 *                         type: string
 *                         description: Type of the competition
 *                       countryName:
 *                         type: string
 *                         description: Name of the country where the competition is held
 *                       domesticLeagueCode:
 *                         type: string
 *                         description: Code of the domestic league
 *                       confederation:
 *                         type: string
 *                         description: Confederation of the competition
 *                       url:
 *                         type: string
 *                         description: URL to the competition's profile on Transfermarkt
 *       404:
 *         description: No data available
 *       500:
 *         description: Unexpected error in API calls
 */
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

    const players = [];
    const clubs = [];
    const competitions = [];

    if (!responseById.error) {
      const dataById = Array.isArray(responseById.data) ? responseById.data : [responseById.data];
      players.push(...dataById);
    }
    if (!responseByName.error) {
      const dataByName = Array.isArray(responseByName.data) ? responseByName.data : [responseByName.data];
      players.push(...dataByName);
    }

    if (!responseClubByName.error) {
      const dataClubByName = Array.isArray(responseClubByName.data) ? responseClubByName.data : [responseClubByName.data];
      clubs.push(...dataClubByName);
    }

    if (!responseCompetition.error) {
      const dataCompetition = Array.isArray(responseCompetition.data) ? responseCompetition.data : [responseCompetition.data];
      competitions.push(...dataCompetition);
    }
    if (!responseCompetitionByName.error) {
      const dataCompetitionByName = Array.isArray(responseCompetitionByName.data) ? responseCompetitionByName.data : [responseCompetitionByName.data];
      competitions.push(...dataCompetitionByName);
    }

    if (players.length > 0 || clubs.length > 0 || competitions.length > 0) {
      res.send([players, clubs, competitions]);
    } else {
      res.status(404).send('Nessun dato disponibile');
    }
  } catch (error) {
    console.error('Errore imprevisto:', error);
    res.status(500).send('Errore imprevisto nelle chiamate API');
  }
});

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get the latest news
 *     description: Returns the latest news from the MongoDB server. This endpoint makes a request to the MongoDB server to retrieve the news data.
 *     responses:
 *       200:
 *         description: Latest news
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier for the news
 *                   id:
 *                     type: integer
 *                     description: ID of the news
 *                   titolo:
 *                     type: string
 *                     description: Title of the news
 *                   titoletto:
 *                     type: string
 *                     description: Subtitle of the news
 *                   testo:
 *                     type: string
 *                     description: Content of the news
 *                   autore:
 *                     type: string
 *                     description: Author of the news
 *                   img:
 *                     type: string
 *                     description: URL of the image associated with the news
 *       500:
 *         description: Error in the request to the MongoDB server
 */

router.get('/news', async (req, res) => {
  try {
    const response = (await axios.get(`http://localhost:3001/news`)).data;
    const newsArray = response.data;
    res.send(newsArray);
  } catch (error) {
    console.error('Error in MongoDB request:', error);
    res.status(500).send('Error in the request to the MongoDB server');
  }
});

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get news details by ID
 *     description: Returns the details of the news based on the specified ID. This endpoint makes a request to the MongoDB server to retrieve the news data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news to retrieve details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                 message:
 *                   type: string
 *                   description: Message related to the request
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the news
 *                     id:
 *                       type: integer
 *                       description: ID of the news
 *                     titolo:
 *                       type: string
 *                       description: Title of the news
 *                     titoletto:
 *                       type: string
 *                       description: Subtitle of the news
 *                     testo:
 *                       type: string
 *                       description: Content of the news
 *                     autore:
 *                       type: string
 *                       description: Author of the news
 *                     img:
 *                       type: string
 *                       description: URL of the image associated with the news
 *       500:
 *         description: Error in the request to the MongoDB server
 */
router.get('/news/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`http://localhost:3001/news/${id}`);
    const newsData = response.data;
    res.send(newsData);
  } catch (error) {
    console.error('Error in the request to the MongoDB server:', error);
    res.status(500).send('Error in the request to the MongoDB server');
  }
});

/**
 * @swagger
 * /manager_name/{club_id}:
 *   get:
 *     summary: Get the name of a club manager
 *     description: Returns the name of a club manager based on the specified club ID. This endpoint makes a request to the MongoDB server to retrieve the manager's name for the last year for which data is available.
 *     parameters:
 *       - in: path
 *         name: club_id
 *         required: true
 *         description: ID of the club to get the manager's name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Name of the club manager
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success status of the request
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                 message:
 *                   type: string
 *                   description: Message accompanying the response
 *                 data:
 *                   type: string
 *                   description: Name of the club manager for the last year for which data is available
 *       500:
 *         description: Error in the request to the MongoDB server
 */

router.get('/manager_name/:club_id', async (req, res) => {
  const clubId = req.params.club_id;
  const url = `http://localhost:3001/games/manager_by_club_id/${clubId}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});

module.exports = router;
