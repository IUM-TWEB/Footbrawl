const express = require('express');
const router = express.Router();
const mid = require('../middlewares/user_mid');
/**
 * @swagger
 * /user/log/:
 *   post:
 *     summary: Login user (using middleware)
 *     description: This endpoint allows users to login by providing their username and password.
 *                  The functionality is implemented in the middleware layer.
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
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *       '500':
 *         description: Internal server error.
 */
router.post('/log/', mid.getUsr);

/**
 * @swagger
 * /user/:
 *   post:
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
 *       '500':
 *         description: Internal server error.
 */
router.post('/', mid.postUsr);

/**
 * @swagger
 * /user/ex/:
 *   post:
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
 *       '404':  # Assuming a 404 error is returned for not found user
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.post('/ex/', mid.getUsrByName);

/**
 * @swagger
 * /user/fav/player/:
 *   post:
 *     summary: Add favorite player to user
 *     description: This endpoint allows users to add a player to their favorite players list.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - userName
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *     responses:
 *       '200':
 *         description: Player added to favorites successfully.
 *       '401':  # Assuming a 401 error is returned for unauthorized access
 *         description: Unauthorized. Invalid username or password.
 *       '404':  # Assuming a 404 error is returned for not found user
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.post('/fav/player/', mid.addFavoritePlayer);

/**
 * @swagger
 * /user/fav/player/:
 *   post:
 *     summary: Add favorite player to user
 *     description: This endpoint allows users to add a player to their favorite players list.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - userName
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *     responses:
 *       '200':
 *         description: Player added to favorites successfully.
 *       '401':  # Assuming a 401 error is returned for unauthorized access
 *         description: Unauthorized. Invalid username or password.
 *       '404':  # Assuming a 404 error is returned for not found user
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.post('/fav/team/', mid.addFavoriteTeam);

/**
 * @swagger
 * /user/fav/player/:
 *   post:
 *     summary: Add favorite formation
 *     description: This endpoint allows users to save the selected formation
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - userName
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *     responses:
 *       '200':
 *         description: Player added to favorites successfully.
 *       '401':  # Assuming a 401 error is returned for unauthorized access
 *         description: Unauthorized. Invalid username or password.
 *       '404':  # Assuming a 404 error is returned for not found user
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.post('/fav/formation', mid.addFormation)

/**
 * @swagger
 * /user/fav/player/:
 *   post:
 *     summary: Add favorite formation
 *     description: This endpoint allows users to save the selected formation
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - userName
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *     responses:
 *       '200':
 *         description: Player added to favorites successfully.
 *       '401':  # Assuming a 401 error is returned for unauthorized access
 *         description: Unauthorized. Invalid username or password.
 *       '404':  # Assuming a 404 error is returned for not found user
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.post('/getfav/formation', mid.getFormation)

/**
 * @swagger
 * /user/getfav/player/:
 *   post:
 *     summary: Get user's favorite players
 *     description: This endpoint retrieves a user's list of favorite players.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *
 */
router.post('/getfav/player', mid.getFavoritePlayer);

/**
 * @swagger
 * /user/getfav/:
 *   post:
 *     summary: Get user's favorite players, clubs and saved formations
 *     description: This endpoint retrieves an object of user's favorite players, clubs and saved formations.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *
 */
router.post('/getfav/', mid.getAllFav);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 */
router.post('/fav/removePlayer', mid.removePlayer)
/**
 * @swagger
 * /fav/removeTeam:
 *   post:
 *     summary: Rimuove un team preferito
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The user's name.
 *                  example: Leanne Graham
 *     responses:
 *       200:
 *         description: Team rimosso con successo
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
 *                   type: object
 *       500:
 *         description: Errore interno del server
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
 *                   type: object
 *       404:
 *         description: Risorsa non trovata
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
 *                   type: object
 */
router.post('/fav/removeTeam', mid.removeTeam)


module.exports = router