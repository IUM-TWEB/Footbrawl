const express = require('express');
const mid = require("../middlewares/game_lineups_mid");
const router = express.Router();

/**
 * @swagger
 * /game-lineups/{id}:
 *   get:
 *     tags:
 *       - Game Lineups
 *     summary: Get lineup details by ID
 *     description: Retrieves detailed information about a specific game lineup by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier for the game lineup.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with lineup details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LineupDetailsResponse'
 *       '404':
 *         description: Lineup not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', mid.getById);

/**
 * @swagger
 * /game-lineups/player/{player}:
 *   get:
 *     tags:
 *       - Game Lineups
 *     summary: Get lineups by player ID
 *     description: Retrieves all game lineups associated with a specific player ID.
 *     parameters:
 *       - in: path
 *         name: player
 *         required: true
 *         description: Unique player identifier.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with player's lineups.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LineupDetailsResponse'
 *       '404':
 *         description: No lineups found for the player.
 *       '500':
 *         description: Internal server error.
 */
router.get('/player/:player', mid.getByPlayer);

/**
 * @swagger
 * /game-lineups/player/{player}/{pos}:
 *   get:
 *     tags:
 *       - Game Lineups
 *     summary: Get lineups by player ID and position
 *     description: Retrieves all game lineups associated with a specific player ID and position.
 *     parameters:
 *       - in: path
 *         name: player
 *         required: true
 *         description: Unique player identifier.
 *         schema:
 *           type: string
 *       - in: path
 *         name: pos
 *         required: true
 *         description: Position played by the player.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with player's lineups for the specified position.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LineupDetailsResponse'
 *       '404':
 *         description: No lineups found for the player in the specified position.
 *       '500':
 *         description: Internal server error.
 */
router.get('/player/:player/:pos', mid.getByPlayerAndPosition);

/**
 * @swagger
 * /game-lineups/club/{club}:
 *   get:
 *     tags:
 *       - Game Lineups
 *     summary: Get lineups by club ID
 *     description: Retrieves all game lineups associated with a specific club ID.
 *     parameters:
 *       - in: path
 *         name: club
 *         required: true
 *         description: Unique club identifier.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with club's lineups.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LineupDetailsResponse'
 *       '404':
 *         description: No lineups found for the club.
 *       '500':
 *         description: Internal server error.
 */
router.get('/club/:club', mid.getByClub);

module.exports = router;
