const express = require('express');
const router = express.Router();
const mid = require('../middlewares/user_mid');

/**
 * @swagger
 * /user/log/:
 *   post:
 *     tags:
 *       - User
 *     summary: Login user (using middleware)
 *     description: This endpoint allows users to login by providing their username and password. The functionality is implemented in the middleware layer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               pwd:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: Login successful. User data returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/log/', mid.getUsr);

/**
 * @swagger
 * /user/:
 *   post:
 *     tags:
 *       - User
 *     summary: Register user
 *     description: This endpoint allows users to register by providing their username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: johndoe
 *               pwd:
 *                 type: string
 *                 description: The password of the user.
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Registration successful.
 *       '400':
 *         description: Bad request. Username might already exist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', mid.postUsr);

/**
 * @swagger
 * /user/ex/:
 *   post:
 *     tags:
 *       - User
 *     summary: Get user by username
 *     description: This endpoint retrieves user data by username.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *     responses:
 *       '200':
 *         description: User data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/ex/', mid.getUsrByName);

/**
 * @swagger
 * /user/fav/player/:
 *   post:
 *     tags:
 *       - User
 *     summary: Add favorite player to user
 *     description: This endpoint allows users to add a player to their favorite players list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               pwd:
 *                 type: string
 *                 description: The password of the user.
 *               playerId:
 *                 type: string
 *                 description: The ID of the player to add.
 *     responses:
 *       '200':
 *         description: Player added to favorites successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/fav/player/', mid.addFavoritePlayer);

/**
 * @swagger
 * /user/fav/team/:
 *   post:
 *     tags:
 *       - User
 *     summary: Add favorite team to user
 *     description: This endpoint allows users to add a team to their favorite teams list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               pwd:
 *                 type: string
 *                 description: The password of the user.
 *               teamId:
 *                 type: string
 *                 description: The ID of the team to add.
 *     responses:
 *       '200':
 *         description: Team added to favorites successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/fav/team/', mid.addFavoriteTeam);

/**
 * @swagger
 * /user/fav/formation:
 *   post:
 *     tags:
 *       - User
 *     summary: Add favorite formation
 *     description: This endpoint allows users to save the selected formation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               pwd:
 *                 type: string
 *                 description: The password of the user.
 *               formation:
 *                 type: object
 *                 description: The formation object to save.
 *     responses:
 *       '200':
 *         description: Formation added to favorites successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/fav/formation', mid.addFormation);

/**
 * @swagger
 * /user/getfav/formation:
 *   post:
 *     tags:
 *       - User
 *     summary: Get user's favorite formation
 *     description: This endpoint retrieves a user's saved formation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               pwd:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: Formation retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/getfav/formation', mid.getFormation);

/**
 * @swagger
 * /user/getfav/player:
 *   post:
 *     tags:
 *       - User
 *     summary: Get user's favorite players
 *     description: This endpoint retrieves a user's list of favorite players.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               pwd:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: Favorite players retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/getfav/player', mid.getFavoritePlayer);

/**
 * @swagger
 * /user/getfav/:
 *   post:
 *     tags:
 *       - User
 *     summary: Get user's favorite players, clubs and saved formations
 *     description: This endpoint retrieves an object of user's favorite players, clubs, and saved formations.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               pwd:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: User's favorite data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/getfav/', mid.getAllFav);

/**
 * @swagger
 * /fav/removePlayer:
 *   post:
 *     tags:
 *       - User
 *     summary: Remove favorite player
 *     description: This endpoint allows users to remove a player from their favorite players list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               pwd:
 *                 type: string
 *                 description: The password of the user.
 *               playerId:
 *                 type: string
 *                 description: The ID of the player to remove.
 *     responses:
 *       '200':
 *         description: Player removed from favorites successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/fav/removePlayer', mid.removePlayer);

/**
 * @swagger
 * /fav/removeTeam:
 *   post:
 *     tags:
 *       - User
 *     summary: Remove favorite team
 *     description: This endpoint allows users to remove a team from their favorite teams list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               pwd:
 *                 type: string
 *                 description: The password of the user.
 *               teamId:
 *                 type: string
 *                 description: The ID of the team to remove.
 *     responses:
 *       '200':
 *         description: Team removed from favorites successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/fav/removeTeam', mid.removeTeam);

module.exports = router;
