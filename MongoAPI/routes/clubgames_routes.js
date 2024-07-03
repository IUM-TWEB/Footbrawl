const express = require('express');
const ctrl = require('../middlewares/club_games_mid');
const router = express.Router();

/**
 * @swagger
 * /clubgames/{gameId}:
 *   get:
 *     tags:
 *       - Club Games
 *     summary: Get a club game by the game id
 *     description: Get all the information about a single game filtering by the game id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: gameId
 *         required: true
 *         in: path
 *         schema:
 *           type: integer
 *         description: The game ID to search in the database
 *     responses:
 *       '200':
 *         description: 200 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClubGameResponse'
 *             examples:
 *               successExample:
 *                 value:
 *                   success: true
 *                   status: 200
 *                   message: ""
 *                   data:
 *                     game_id: 1
 *                     club_id: 123
 *                     own_goals: 321
 *                     own_position: 123
 *                     own_manager_name: "Federico Acquadro"
 *                     opponent_id: 312
 *                     opponent_goals: 2
 *                     opponent_position: 123
 *                     opponent_manager_name: "Umberto Rastello"
 *                     hosting: "true"
 *                     is_win: 1
 *       '500':
 *         description: 500 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               errorExample:
 *                 value:
 *                   success: false
 *                   status: 500
 *                   message: "Internal server error"
 *                   data: []
 *       '404':
 *         description: 404 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               notFoundExample:
 *                 value:
 *                   success: false
 *                   status: 404
 *                   message: "No resource found"
 *                   data: []
 */

router.get('/:game', ctrl.getByGame);

/**
 * @swagger
 * /clubgames/club/{clubId}:
 *   get:
 *     tags:
 *       - Club Games
 *     summary: Get a club game by the club id
 *     description: Get all the information about a set of games filtering by the club id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: clubId
 *         required: true
 *         in: path
 *         schema:
 *           type: integer
 *         description: The club ID to search in the database
 *     responses:
 *       '200':
 *         description: 200 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClubGameResponse'
 *             examples:
 *               successExample:
 *                 value:
 *                   success: true
 *                   status: 200
 *                   message: ""
 *                   data:
 *                     game_id: 1
 *                     club_id: 123
 *                     own_goals: 321
 *                     own_position: 123
 *                     own_manager_name: "Federico Acquadro"
 *                     opponent_id: 312
 *                     opponent_goals: 2
 *                     opponent_position: 123
 *                     opponent_manager_name: "Umberto Rastello"
 *                     hosting: "true"
 *                     is_win: 1
 *       '500':
 *         description: 500 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               errorExample:
 *                 value:
 *                   success: false
 *                   status: 500
 *                   message: "Internal server error"
 *                   data: []
 *       '404':
 *         description: 404 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               notFoundExample:
 *                 value:
 *                   success: false
 *                   status: 404
 *                   message: "No resource found"
 *                   data: []
 */
router.get('/club/:club', ctrl.getByClub);
/**
 * @swagger
 * /clubgames/club/{clubid}/{isHosted}:
 *   get:
 *     tags:
 *       - Club Games
 *     summary: Get a club game by the game id
 *     description: Get all the information about a single game filtering by the game id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: clubId
 *         required: true
 *         in: path
 *         schema:
 *           type: integer
 *         description: The club ID to search in the database
 *
 *       - name: isHosted
 *         required: true
 *         in: path
 *         schema:
 *           type: boolean
 *         description: filter the games which are hosted or not
 *     responses:
 *       '200':
 *         description: 200 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClubGameResponse'
 *             examples:
 *               successExample:
 *                 value:
 *                   success: true
 *                   status: 200
 *                   message: ""
 *                   data:
 *                     game_id: 1
 *                     club_id: 123
 *                     own_goals: 321
 *                     own_position: 123
 *                     own_manager_name: "Federico Acquadro"
 *                     opponent_id: 312
 *                     opponent_goals: 2
 *                     opponent_position: 123
 *                     opponent_manager_name: "Umberto Rastello"
 *                     hosting: "true"
 *                     is_win: 1
 *       '500':
 *         description: 500 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               errorExample:
 *                 value:
 *                   success: false
 *                   status: 500
 *                   message: "Internal server error"
 *                   data: []
 *       '404':
 *         description: 404 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               notFoundExample:
 *                 value:
 *                   success: false
 *                   status: 404
 *                   message: "No resource found"
 *                   data: []
 */

router.get('/club/:club/:isHosted', ctrl.getByClubAndHosted);

module.exports = router;
