const express = require('express');
const mid = require("../middlewares/game_events_mid");
const router = express.Router();

/**
 * @swagger
 * /game-events/{id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get event details by ID
 *     description: Retrieves detailed information about a specific game event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier for the game event.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with game event details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameEventResponse'
 *       '404':
 *         description: Game event not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', mid.getById);

/**
 * @swagger
 * /game-events/player/{player_id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get events by player ID
 *     description: Retrieves all game events related to a specific player by their player ID.
 *     parameters:
 *       - in: path
 *         name: player_id
 *         required: true
 *         description: Unique player identifier.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response with player's game events.
 *       '404':
 *         description: No game events found for the player.
 *       '500':
 *         description: Internal server error.
 */
router.get('/player/:player_id', mid.getByPlayer);

/**
 * @swagger
 * /game-events/player_goals_date/{player_id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get goal dates by player ID
 *     description: Retrieves dates of all goals scored by a specific player.
 *     parameters:
 *       - in: path
 *         name: player_id
 *         required: true
 *         description: Player ID for which goal dates are retrieved.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response with dates of goals.
 *       '404':
 *         description: No goals found for the player.
 *       '500':
 *         description: Internal server error.
 */
router.get('/player_goals_date/:player_id', mid.getGoalDatesById);

/**
 * @swagger
 * /game-events/player_assist_date/{player_id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get assist dates by player ID
 *     description: Retrieves dates of all assists made by a specific player.
 *     parameters:
 *       - in: path
 *         name: player_id
 *         required: true
 *         description: Player ID for which assist dates are retrieved.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response with dates of assists.
 *       '404':
 *         description: No assists found for the player.
 *       '500':
 *         description: Internal server error.
 */
router.get('/player_assist_date/:player_id', mid.getAssistDatesByPlayerId);

/**
 * @swagger
 * /game-events/club/{club_id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get events by club ID
 *     description: Retrieves all game events associated with a specific club by its club ID.
 *     parameters:
 *       - in: path
 *         name: club_id
 *         required: true
 *         description: Unique club identifier.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response with club's game events.
 *       '404':
 *         description: No game events found for the club.
 *       '500':
 *         description: Internal server error.
 */
router.get('/club/:club_id', mid.getByClub);

/**
 * @swagger
 * /game-events/top_scorer/{competition_id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get top scorer of a competition
 *     description: Retrieves the top scorer of a specific competition by competition ID.
 *     parameters:
 *       - in: path
 *         name: competition_id
 *         required: true
 *         description: Competition ID for which top scorer information is retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with top scorer details.
 *       '404':
 *         description: No top scorer found for the competition.
 *       '500':
 *         description: Internal server error.
 */
router.get('/top_scorer/:competition_id', mid.getTopScorer);

module.exports = router;
