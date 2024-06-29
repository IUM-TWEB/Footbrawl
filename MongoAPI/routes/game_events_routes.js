const express = require('express');
const mid = require("../middlewares/game_events_mid");
const router = express.Router();

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get an event by the event id
 *     description: Get all the information about an event filtering by the event id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: The event ID to search in the database
 *     responses:
 *       '200':
 *         description: 200 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *             examples:
 *               successExample:
 *                 value:
 *                   success: true
 *                   status: 200
 *                   message: ""
 *                   data:
 *                     _id: "ag4432fe"
 *                     date: "2012-08-05T00:00:00.000+00:00"
 *                     game_id: 123
 *                     minute: 89
 *                     type: "Goal"
 *                     club_id: 321
 *                     player_id: 301
 *                     description: "Yellow card"
 *                     player_in_id: 321
 *                     player_assist_id: 123
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
router.get('/:id', mid.getById);

/**
 * @swagger
 * /events/player/{player_id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get a set of events by a player id
 *     description: Get all the information about an event filtering by a player id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: player_id
 *         required: true
 *         in: path
 *         schema:
 *           type: number
 *         description: The player ID to search in the database
 *     responses:
 *       '200':
 *         description: 200 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *             examples:
 *               successExample:
 *                 value:
 *                   success: true
 *                   status: 200
 *                   message: ""
 *                   data:
 *                     _id: "ag4432fe"
 *                     date: "2012-08-05T00:00:00.000+00:00"
 *                     game_id: 123
 *                     minute: 89
 *                     type: "Goal"
 *                     club_id: 321
 *                     player_id: 301
 *                     description: "Yellow card"
 *                     player_in_id: 321
 *                     player_assist_id: 123
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
router.get('/player/:player_id', mid.getByPlayer);

/**
 * @swagger
 * /events/player_goals_date/{player_id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get a set of dates in which a player made a goal
 *     description: Return a set of dates in which, whatever the competition, a player made a goal
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: player_id
 *         required: true
 *         in: path
 *         schema:
 *           type: number
 *         description: The player ID to search in the database
 *     responses:
 *       '200':
 *         description: 200 response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date-time
 *             examples:
 *               successExample:
 *                 value:
 *                   success: true
 *                   status: 200
 *                   message: ""
 *                   data:
 *                     - date: "2012-08-19T00:00:00.000Z"
 *                     - date: "2013-01-27T00:00:00.000Z"
 *                     - date: "2012-09-26T00:00:00.000Z"
 *                     - date: "2012-12-19T00:00:00.000Z"
 *                     - date: "2013-09-29T00:00:00.000Z"
 *                     - date: "2013-09-25T00:00:00.000Z"
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

router.get('/player_goals_date/:player_id', mid.getGoalDatesById);

/**
 * @swagger
 * /events/player_assist_date/{player_id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get a set of dates in which a player made an assist
 *     description: Return a set of dates in which, whatever the competition, a player made a competition
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: player_id
 *         required: true
 *         in: path
 *         schema:
 *           type: number
 *         description: The player ID to search in the database
 *     responses:
 *       '200':
 *         description: 200 response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date-time
 *             examples:
 *               successExample:
 *                 value:
 *                   success: true
 *                   status: 200
 *                   message: ""
 *                   data:
 *                     - date: "2012-08-19T00:00:00.000Z"
 *                     - date: "2013-01-27T00:00:00.000Z"
 *                     - date: "2012-09-26T00:00:00.000Z"
 *                     - date: "2012-12-19T00:00:00.000Z"
 *                     - date: "2013-09-29T00:00:00.000Z"
 *                     - date: "2013-09-25T00:00:00.000Z"
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

router.get('/player_assist_date/:player_id', mid.getAssistDatesByPlayerId);

/**
 * @swagger
 * /events/club/{club_id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get a set of events of a club
 *     description: Get all the information about an set of events filtering by the club id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: club_id
 *         required: true
 *         in: path
 *         schema:
 *           type: number
 *         description: The event ID to search in the database
 *     responses:
 *       '200':
 *         description: 200 response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *             examples:
 *               successExample:
 *                 value:
 *                   success: true
 *                   status: 200
 *                   message: ""
 *                   data:
 *                     _id: "ag4432fe"
 *                     date: "2012-08-05T00:00:00.000+00:00"
 *                     game_id: 123
 *                     minute: 89
 *                     type: "Goal"
 *                     club_id: 321
 *                     player_id: 301
 *                     description: "Yellow card"
 *                     player_in_id: 321
 *                     player_assist_id: 123
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
router.get('/club/:club_id', mid.getByClub);

/**
 * @swagger
 * /events/top_scorer/{competition_id}:
 *   get:
 *     tags:
 *       - Game Events
 *     summary: Get a set of top scorer players of a specific competition
 *     description: Get a set of top scorer players of a specific competition in the last season
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: competition_id
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: The competition ID to search in the database
 *     responses:
 *       '200':
 *         description: 200 response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       totalGoals:
 *                         type: integer
 *                       player_id:
 *                         type: integer
 *             examples:
 *               successExample:
 *                 value:
 *                   success: true
 *                   status: 200
 *                   message: ""
 *                   data:
 *                     - totalGoals: 8
 *                       player_id: 62094
 *                     - totalGoals: 6
 *                       player_id: 315110
 *                     - totalGoals: 6
 *                       player_id: 454121
 *                     - totalGoals: 5
 *                       player_id: 365172
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

router.get('/top_scorer/:competition_id', mid.getTopScorer);

module.exports = router;
