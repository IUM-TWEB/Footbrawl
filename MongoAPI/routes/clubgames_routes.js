const express = require('express');
const ctrl = require('../middlewares/club_games_mid');
const router = express.Router();

/**
 * @swagger
 * /club_games/{game}:
 *   get:
 *     tags:
 *       - Club Games
 *     summary: Get club game details by game ID
 *     description: Retrieves details for a specific club game based on the game ID.
 *     parameters:
 *       - in: path
 *         name: game
 *         required: true
 *         description: Unique game identifier.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with game details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameDetailsResponse'
 *       '404':
 *         description: No game found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:game', ctrl.getByGame);

/**
 * @swagger
 * /club_games/club/{club}:
 *   get:
 *     tags:
 *       - Club Games
 *     summary: Get games by club ID
 *     description: Retrieves all games associated with a specific club ID.
 *     parameters:
 *       - in: path
 *         name: club
 *         required: true
 *         description: Unique club identifier.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameDetailsResponse'
 *       '404':
 *         description: No games found for the club.
 *       '500':
 *         description: Internal server error.
 */
router.get('/club/:club', ctrl.getByClub);

/**
 * @swagger
 * /club_games/club/{club}/{isHosted}:
 *   get:
 *     tags:
 *       - Club Games
 *     summary: Get hosted or non-hosted games by club ID
 *     description: Retrieves all games hosted or not hosted by a specific club based on the club ID and hosted flag.
 *     parameters:
 *       - in: path
 *         name: club
 *         required: true
 *         description: Unique club identifier.
 *         schema:
 *           type: string
 *       - in: path
 *         name: isHosted
 *         required: true
 *         description: Flag indicating whether to retrieve games hosted (true) or not hosted (false) by the club.
 *         schema:
 *           type: boolean
 *     responses:
 *       '200':
 *         description: Successful response with list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameDetailsResponse'
 *       '404':
 *         description: No matching games found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/club/:club/:isHosted', ctrl.getByClubAndHosted);

module.exports = router;
