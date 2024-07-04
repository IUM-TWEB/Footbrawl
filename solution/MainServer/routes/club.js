const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * @swagger
 * tags:
 *   name: Clubs
 *   description: Operazioni relative ai club
 */

/**
 * @swagger
 * /club/{id}:
 *   get:
 *     summary: Get club details by ID
 *     description: Returns the details of a club based on the specified club ID. This endpoint makes a request to the main server.
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the club to get details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Club details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clubId:
 *                   type: integer
 *                   description: Club ID
 *                 clubCode:
 *                   type: string
 *                   description: Club code
 *                 name:
 *                   type: string
 *                   description: Club name
 *                 domesticCompetitionId:
 *                   type: string
 *                   description: Domestic competition ID
 *                 domesticCompetitionName:
 *                   type: string
 *                   description: Domestic competition name
 *                 squadSize:
 *                   type: integer
 *                   description: Number of players in the squad
 *                 averageAge:
 *                   type: number
 *                   description: Average age of players
 *                 foreignersNumber:
 *                   type: integer
 *                   description: Number of foreign players
 *                 foreignersPercentage:
 *                   type: number
 *                   description: Percentage of foreign players
 *                 nationalTeamPlayers:
 *                   type: integer
 *                   description: Number of national team players
 *                 stadiumName:
 *                   type: string
 *                   description: Name of the stadium
 *                 stadiumSeats:
 *                   type: integer
 *                   description: Number of seats in the stadium
 *                 coachName:
 *                   type: string
 *                   nullable: true
 *                   description: Name of the coach
 *                 last_season:
 *                   type: integer
 *                   description: Last season year
 *                 url:
 *                   type: string
 *                   description: URL of the club's page
 *                 netTransferRec:
 *                   type: integer
 *                   description: Net transfer record
 *                 totalMarketVal:
 *                   type: integer
 *                   description: Total market value of the squad
 *       500:
 *         description: Main server is not responding
 */
router.get('/:id', async (req, res) => {
  try {
    const response = (await axios.get(`http://localhost:8080/club?id=${req.params.id}`)).data;
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send('Main server is not responding');
  }
});

/**
 * @swagger
 * /club/clubByName/{club_name}:
 *   get:
 *     summary: Get club details by name
 *     description: Returns the details of the club based on the specified club name.
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: club_name
 *         required: true
 *         description: Name of the club to get details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Club details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   clubId:
 *                     type: integer
 *                     description: Unique identifier for the club
 *                   clubCode:
 *                     type: string
 *                     description: Code of the club
 *                   name:
 *                     type: string
 *                     description: Name of the club
 *                   domesticCompetitionId:
 *                     type: string
 *                     description: Identifier of the domestic competition
 *                   domesticCompetitionName:
 *                     type: string
 *                     description: Name of the domestic competition
 *                   squadSize:
 *                     type: integer
 *                     description: Size of the club's squad
 *                   averageAge:
 *                     type: number
 *                     format: float
 *                     description: Average age of the squad
 *                   foreignersNumber:
 *                     type: integer
 *                     description: Number of foreign players in the squad
 *                   foreignersPercentage:
 *                     type: number
 *                     format: float
 *                     description: Percentage of foreign players in the squad
 *                   nationalTeamPlayers:
 *                     type: integer
 *                     description: Number of national team players in the squad
 *                   stadiumName:
 *                     type: string
 *                     description: Name of the club's stadium
 *                   stadiumSeats:
 *                     type: integer
 *                     description: Number of seats in the stadium
 *                   coachName:
 *                     type: string
 *                     description: Name of the coach
 *                     nullable: true
 *                   last_season:
 *                     type: integer
 *                     description: The last season year
 *                   url:
 *                     type: string
 *                     description: URL to the club's profile on Transfermarkt
 *                   netTransferRec:
 *                     type: integer
 *                     description: Net transfer record
 *                   totalMarketVal:
 *                     type: integer
 *                     description: Total market value of the club
 *       500:
 *         description: Error in the request to the Postgres server
 */


router.get('/clubByName/:club_name', async (req, res) => {
  const name = req.params.club_name;
  const url = `http://localhost:8080/clubByName?name=${name}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    res.status(500).json({error: 'An error occurred while fetching the data.'});
  }
});

/**
 * @swagger
 * /club/playersOfClubLastSeason/{current_club_id}:
 *   get:
 *     summary: Get players of a club from last season
 *     description: Returns the list of players who were part of the specified club in the last season. This endpoint makes a request to the Spring Boot server.
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: current_club_id
 *         required: true
 *         description: ID of the club to get players for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of players from the last season
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   playerId:
 *                     type: integer
 *                     description: ID of the player
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
 *                     description: Market value of the player
 *                   highestMarketValue:
 *                     type: number
 *                     description: Highest market value of the player
 *                   lastSeason:
 *                     type: integer
 *                     description: Last season year
 *                   currentClubId:
 *                     type: integer
 *                     description: ID of the current club
 *                   countryOfBirth:
 *                     type: string
 *                     description: Country of birth
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     description: Date of birth
 *                   position:
 *                     type: string
 *                     description: Position of the player
 *                   foot:
 *                     type: string
 *                     description: Preferred foot of the player
 *                   heightInCm:
 *                     type: integer
 *                     description: Height of the player in cm
 *                   imageUrl:
 *                     type: string
 *                     description: URL of the player's image
 *                   currentClubDomesticCompetitionId:
 *                     type: string
 *                     description: ID of the current club's domestic competition
 *                   currentClubName:
 *                     type: string
 *                     description: Name of the current club
 *       500:
 *         description: Error in the request to the Spring Boot server
 */
router.get('/playersOfClubLastSeason/:current_club_id', async (req, res) => {
  const id = req.params.current_club_id;
  try {
    const response = await axios.get(`http://localhost:8080/playersOfClubLastSeason?id=${id}`);
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Error in the request to the Spring Boot server');
  }
});

module.exports = router;
