const express = require('express');
const router = express.Router();
const axios = require('axios');

function extract_values(raw) {
  const res_data = {
    'dates': [],
    'goal_counts': []
  };

  raw.sort((a, b) => {
    return parseInt(a.date.substring(0, 4)) - parseInt(b.date.substring(0, 4));
  });

  let currentYear = null;
  let valuesForYear = [];

  for (let i of raw) {
    let int_date = parseInt(i.date.substring(0, 4));

    if (currentYear !== int_date) {
      if (valuesForYear.length > 0) {
        const median = calculateMedian(valuesForYear);
        res_data.goal_counts.push(median);
      }

      currentYear = int_date;
      valuesForYear = [];
      res_data.dates.push(currentYear);
    }

    valuesForYear.push(i.marketValue);
  }

  if (valuesForYear.length > 0) {
    const median = calculateMedian(valuesForYear);
    res_data.goal_counts.push(median);
  }

  return res_data;
}

function calculateMedian(values) {
  const sortedValues = values.sort((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  } else {
    return sortedValues[middle];
  }
}

function extract(raw) {
  const res_data = {
    'dates': [],
    'goal_counts': []
  }

  for (let i of raw) {
    let int_date = parseInt((i.date).substring(0, 4))
    if (!res_data.dates.includes(int_date)) {
      res_data.dates.push(int_date)
      res_data.goal_counts.push(1)
    }
    const index_date = res_data.dates.indexOf(int_date)
    res_data.goal_counts[index_date]++
  }
  return res_data
}

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Operazioni relative ai giocatori
 */

/**
 * @swagger
 * /market_value/{id}:
 *   get:
 *     summary: Get player's market value over time
 *     description: Returns the market value of a player over time based on the player's ID. This endpoint makes a request to the Spring Boot server to retrieve the data.
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player to get market value for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player's market value data over time
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dates:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     description: Year of the market value data
 *                 goal_counts:
 *                   type: array
 *                   items:
 *                     type: number
 *                     description: Market value of the player in that year
 *       500:
 *         description: Error in the request to the Spring Boot server
 */
router.get('/market_value/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:8080/playerValuation?id=${req.params.id}`);
    res.send(extract_values(response.data));
  } catch (err) {
    res.status(500).send('Error in the request to the Spring Boot server');
  }
});

/**
 * @swagger
 * /player_clubs/{player_id}:
 *   get:
 *     summary: Get the clubs a player has been associated with
 *     description: Returns a list of clubs that a player has been associated with based on the player's ID. This endpoint makes requests to multiple servers to gather the necessary data.
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: player_id
 *         required: true
 *         description: ID of the player to get clubs for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of clubs associated with the player
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clubs:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Name of the club
 *       500:
 *         description: Error occurred while processing the request
 */
router.get('/player_clubs/:player_id', async (req, res) => {
  try {
    const response = (await axios.get(`http://localhost:3001/events/player/${req.params.player_id}`)).data;
    const clubs_id = [];
    const data = {
      'clubs': []
    };
    if (Symbol.iterator in Object(response.data)) {
      for (let i of response.data) {
        if (!clubs_id.includes(i.club_id)) {
          try {
            const club_name = await axios.get(`http://localhost:8080/club?id=${i.club_id}`);
            if (club_name) {
              data.clubs.push(club_name.data.name);
              clubs_id.push(i.club_id);
            }
          } catch (e) {
            console.log(`Error fetching club name for club ID ${i.club_id}:`, e);
          }
        }
      }
    }
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.name);
  }
});

/**
 * @swagger
 * /goals_date/{player_id}:
 *   get:
 *     summary: Get player's goal counts by year
 *     description: Returns the count of goals scored by a player each year based on the player's ID. This endpoint makes a request to the Spring Boot server to retrieve the data.
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: player_id
 *         required: true
 *         description: ID of the player to get goal counts for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player's goal counts by year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dates:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     description: Year of the goal data
 *                 goal_counts:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     description: Number of goals scored in that year
 *       500:
 *         description: Error in the request to the Spring Boot server
 */

router.get('/goals_date/:player_id', async (req, res) => {
  console.log('entro qui');
  try {
    const response = (await axios.get(`http://localhost:3001/events/player_goals_date/${req.params.player_id}`)).data;
    if (Symbol.iterator in Object(response.data)) {
      const res_data = extract(response.data);
      res.send(res_data);
    } else {
      res.send('');
    }
  } catch (error) {
    console.error('Error in the request to the Spring Boot server:', error);
    res.status(500).send('Error in the request to the Spring Boot server');
  }
});

/**
 * @swagger
 * /assist_date/{player_id}:
 *   get:
 *     summary: Get player's assist counts by year
 *     description: Returns the count of assists made by a player each year based on the player's ID. This endpoint makes a request to the Spring Boot server to retrieve the data.
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: player_id
 *         required: true
 *         description: ID of the player to get assist counts for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player's assist counts by year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dates:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     description: Year of the assist data
 *                   example: []
 *                 goal_counts:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     description: Number of assists made in that year
 *                   example: []
 *       500:
 *         description: Error in the request to the Spring Boot server
 */

router.get('/assist_date/:player_id', async (req, res) => {
  try {
    const response = (await axios.get(`http://localhost:3001/events/player_assist_date/${req.params.player_id}`)).data;
    const res_data = extract(response.data);
    res.send(res_data);
  } catch (error) {
    console.error('Error in the request to the Spring Boot server:', error);
    res.status(500).send('Error in the request to the Spring Boot server');
  }
});

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get player details by ID
 *     description: Returns the details of a player based on the player's ID. This endpoint makes a request to the Spring Boot server to retrieve the data.
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player to get details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 playerId:
 *                   type: integer
 *                   description: ID of the player
 *                 firstName:
 *                   type: string
 *                   description: First name of the player
 *                 lastName:
 *                   type: string
 *                   description: Last name of the player
 *                 name:
 *                   type: string
 *                   description: Full name of the player
 *                 age:
 *                   type: integer
 *                   description: Age of the player
 *                 marketValue:
 *                   type: number
 *                   description: Market value of the player
 *                 highestMarketValue:
 *                   type: number
 *                   description: Highest market value of the player
 *                 lastSeason:
 *                   type: integer
 *                   description: Last season year
 *                 currentClubId:
 *                   type: integer
 *                   description: ID of the current club
 *                 countryOfBirth:
 *                   type: string
 *                   description: Country of birth
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                   description: Date of birth
 *                 position:
 *                   type: string
 *                   description: Position of the player
 *                 foot:
 *                   type: string
 *                   description: Preferred foot of the player
 *                 heightInCm:
 *                   type: integer
 *                   description: Height of the player in cm
 *                 imageUrl:
 *                   type: string
 *                   description: URL of the player's image
 *                 currentClubDomesticCompetitionId:
 *                   type: string
 *                   description: ID of the current club's domestic competition
 *                 currentClubName:
 *                   type: string
 *                   description: Name of the current club
 *       500:
 *         description: Error in the request to the Spring Boot server
 */
router.get('/:id', async (req, res) => {
  console.log('Entered with ID =', req.params.id);
  try {
    const response = await axios.get(`http://localhost:8080/player?id=${req.params.id}`);
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send('The main server is not responding');
  }
});

module.exports = router;
