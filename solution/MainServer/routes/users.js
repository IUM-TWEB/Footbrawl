const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operazioni relative agli utenti
 */


/**
 * @swagger
 * /users/log:
 *   post:
 *     summary: Log in a user
 *     description: Logs in a user by sending their credentials to the server.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               pwd:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login result
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               enum: [0, 1]
 *       500:
 *         description: Error occurred while logging in
 */
router.post('/log', async (req, res) => {
  try {
    console.log(req.body);
    const response = (await axios.post(`http://localhost:3001/user/log/`, req.body)).data;
    if (Array.isArray(response.data) && response.data.length)
      res.send("1");
    else
      res.send("0");
  } catch (err) {
    console.log(err);
    res.send(err.name);
  }
});

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user if they do not already exist.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               pwd:
 *                 type: string
 *     responses:
 *       200:
 *         description: User creation result
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               enum: [0, 1, -1]
 *       500:
 *         description: Error occurred while creating user
 */
router.post('/', async (req, res) => {
  try {
    const exist = (await axios.post(`http://localhost:3001/user/ex`, req.body)).data;

    console.log(exist.data);
    if (Array.isArray(exist.data) && !exist.data.length) {
      const newUser = (await axios.post(`http://localhost:3001/user`, req.body)).data;
      res.send("1");
    } else {
      res.send("0");
    }
  } catch (err) {
    res.send("-1");
  }
});

/**
 * @swagger
 * /users/favplayer:
 *   post:
 *     summary: Add a favorite player
 *     description: Adds a favorite player for the user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               pwd:
 *                 type: string
 *               playerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Favorite player added
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Error occurred while adding favorite player
 */
router.post('/favplayer', async (req, res) => {
  try {
    const response = (await axios.post("http://localhost:3001/user/fav/player", req.body)).data;
    if (response.success)
      res.send(response.data);
    else {
      res.status(response.status).send(response.data)
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Server error'});
  }
});

/**
 * @swagger
 * /users/favteam:
 *   post:
 *     summary: Add a favorite team
 *     description: Adds a favorite team for the user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               pwd:
 *                 type: string
 *               teamId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Favorite team added
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Error occurred while adding favorite team
 */
router.post('/favteam', async (req, res) => {
  try {
    const response = (await axios.post("http://localhost:3001/user/fav/team", req.body)).data;
    if (response.success)
      res.send(response.data);
    else {
      res.status(response.status).send(response.data)
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Server error'});
  }
});

/**
 * @swagger
 * /users/getfav:
 *   post:
 *     summary: Get favorite players and teams
 *     description: Retrieves the favorite players and teams for the user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               pwd:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of favorite players and teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error occurred while retrieving favorites
 */
router.post('/getfav', async (req, res) => {
  console.log(req.body);
  try {
    const response = (await axios.post(`http://localhost:3001/user/getfav/`, {
      username: req.body.username,
      pwd: req.body.pwd
    })).data;
    if (response.success)
      res.send(response.data);
    else {
      res.status(response.status).send(response.data)
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

/**
 * @swagger
 * /users/postFormations:
 *   post:
 *     summary: Add a favorite formation
 *     description: Adds a favorite formation for the user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               pwd:
 *                 type: string
 *               formation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite formation added
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Error occurred while adding favorite formation
 */
router.post('/postFormations', async (req, res) => {
  try {
    const response = (await axios.post(`http://localhost:3001/user/fav/formation`, {
      username: req.body.username,
      pwd: req.body.pwd,
      formation: req.body.formation,
    })).data;

    if (response.success)
      res.send(response.data);
    else {
      res.status(response.status).send(response.data)
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

/**
 * @swagger
 * /users/getFormations:
 *   post:
 *     summary: Get favorite formations
 *     description: Retrieves the favorite formations for the user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               pwd:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of favorite formations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error occurred while retrieving favorite formations
 */
router.post('/getFormations', async (req, res) => {
  try {
    const response = (await axios.post('http://localhost:3001/user/getfav/formation', {
      username: req.body.username,
      pwd: req.body.pwd,
    })).data;
    if (response.success)
      res.send(response.data.formations);
    else {
      res.status(response.status).send(response.data)
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

/**
 * @swagger
 * /users/removePlayer:
 *   post:
 *     summary: Remove a player from the user's favorites
 *     description: This endpoint removes a player from the user's favorite players list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *                 example: 12345
 *               playerId:
 *                 type: string
 *                 description: The ID of the player to be removed
 *                 example: 67890
 *     responses:
 *       200:
 *         description: Successfully removed the player from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Player removed from favorites successfully
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       example: true
 *                     modifiedCount:
 *                       type: integer
 *                       example: 1
 *                     upsertedId:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     upsertedCount:
 *                       type: integer
 *                       example: 0
 *                     matchedCount:
 *                       type: integer
 *                       example: 1
 *               example:
 *                 success: true
 *                 message: Player removed from favorites successfully
 *                 status: OK
 *                 data:
 *                   acknowledged: true
 *                   modifiedCount: 1
 *                   upsertedId: null
 *                   upsertedCount: 0
 *                   matchedCount: 1
 *       500:
 *         description: Error in the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error in the server
 *                 status:
 *                   type: string
 *                   example: Internal Server Error
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.post('/removePlayer', async (req, res) => {
  try {
    const response = await axios.post("http://localhost:3001/user/fav/removePlayer", req.body);
    if (response.success)
      res.send(response.data);
    else {
      res.status(response.status).send(response.data)
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Errore nel server'});
  }
})

/**
 * @swagger
 * /users/removeTeam:
 *   post:
 *     summary: Remove a Team from the user's favorites
 *     description: This endpoint removes a team from the user's favorite team list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *                 example: 12345
 *               club_Id:
 *                 type: string
 *                 description: The ID of the team to be removed
 *                 example: 67890
 *     responses:
 *       200:
 *         description: Successfully removed the team from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: team removed from favorites successfully
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       example: true
 *                     modifiedCount:
 *                       type: integer
 *                       example: 1
 *                     upsertedId:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     upsertedCount:
 *                       type: integer
 *                       example: 0
 *                     matchedCount:
 *                       type: integer
 *                       example: 1
 *               example:
 *                 success: true
 *                 message: team removed from favorites successfully
 *                 status: OK
 *                 data:
 *                   acknowledged: true
 *                   modifiedCount: 1
 *                   upsertedId: null
 *                   upsertedCount: 0
 *                   matchedCount: 1
 *       500:
 *         description: Error in the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error in the server
 *                 status:
 *                   type: string
 *                   example: Internal Server Error
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.post('/removeTeam', async (req, res) => {
  try {
    const response = await axios.post("http://localhost:3001/user/fav/removeTeam", req.body);
    if (response.success)
      res.send(response.data);
    else {
      res.status(response.status).send(response.data)
    }  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Errore nel server'});
  }
})
module.exports = router;
