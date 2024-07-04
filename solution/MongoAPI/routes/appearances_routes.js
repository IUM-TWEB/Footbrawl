const express = require('express');
const mid = require('../middlewares/appearances_mid');
const router = express.Router();

/**
 * @swagger
 * /app/appearances/{id}:
 *   get:
 *     tags:
 *       - Appearances
 *     summary: Get Player Appearance by ID
 *     description: Retrieves player appearance data based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier for the player appearance.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with player appearance data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppearanceResponse'
 *       '404':
 *         description: Player appearance not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', mid.getById);

/**
 * @swagger
 * /app/appearances/game/{game_id}:
 *   get:
 *     tags:
 *       - Appearances
 *     summary: Get Appearances by Game ID
 *     description: Retrieves all player appearances data for a specific game based on the game ID.
 *     parameters:
 *       - in: path
 *         name: game_id
 *         required: true
 *         description: Unique game identifier for which appearances are retrieved.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response with appearances data.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppearanceResponse'
 *       '404':
 *         description: No appearances found for the given game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/game/:game_id', mid.getByGame);

/**
 * @swagger
 * /app/appearances/gp/{game_id}/{player_id}:
 *   get:
 *     tags:
 *       - Appearances
 *     summary: Get Appearance by Game and Player ID
 *     description: Retrieves a specific player's appearance data in a specific game.
 *     parameters:
 *       - in: path
 *         name: game_id
 *         required: true
 *         description: Game identifier.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: player_id
 *         required: true
 *         description: Player identifier.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response with player appearance data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppearanceResponse'
 *       '404':
 *         description: No appearance found for the given player in the specified game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/gp/:game_id/:player_id', mid.getByGP);

/**
 * @swagger
 * /app/appearances/player/{player_id}:
 *   get:
 *     tags:
 *       - Appearances
 *     summary: Get Appearances by Player ID
 *     description: Retrieves all appearances data for a specific player based on the player ID.
 *     parameters:
 *       - in: path
 *         name: player_id
 *         required: true
 *         description: Unique player identifier.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response with player appearances data.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppearanceResponse'
 *       '404':
 *         description: No appearances found for the given player
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/player/:player_id', mid.getByPlayer);

module.exports = router;

