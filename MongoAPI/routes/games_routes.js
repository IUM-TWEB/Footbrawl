const express = require('express');
const ctrl = require('../middlewares/games_mid');
const router = express.Router();

/**
 * @swagger
 * /games/last_game/{comp}:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get last game of a competition
 *     description: Retrieves the details of the last game for a specific competition.
 *     parameters:
 *       - in: path
 *         name: comp
 *         required: true
 *         description: Competition identifier.
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
router.get('/last_game/:comp', ctrl.getByCompLast);

/**
 * @swagger
 * /games/manager_by_club_id/{club_id}:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get manager name by club ID
 *     description: Retrieves the manager's name for a specific club by its ID.
 *     parameters:
 *       - in: path
 *         name: club_id
 *         required: true
 *         description: Club identifier.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with manager's name.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ManagerResponse'
 *       '404':
 *         description: No manager found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/manager_by_club_id/:club_id', ctrl.getManagerNameByClubId);

/**
 * @swagger
 * /games/last_game_club/{club_id}:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get last game by club ID
 *     description: Retrieves the details of the last game for a specific club by its ID.
 *     parameters:
 *       - in: path
 *         name: club_id
 *         required: true
 *         description: Club identifier.
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
router.get('/last_game_club/:club_id', ctrl.getByClubLast);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get game details by ID
 *     description: Retrieves detailed information about a specific game by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Game identifier.
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
 *         description: Game not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /games/{comp}/{season}:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get games by competition and season
 *     description: Retrieves all games for a specific competition and season.
 *     parameters:
 *       - in: path
 *         name: comp
 *         required: true
 *         description: Competition identifier.
 *         schema:
 *           type: string
 *       - in: path
 *         name: season
 *         required: true
 *         description: Season identifier.
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
 *         description: No games found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:comp/:season', ctrl.getBySeasonAndComp);

module.exports = router;
