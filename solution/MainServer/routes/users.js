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
 * /log:
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
 * /:
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
 * /favplayer:
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
    console.log(response)
    res.send(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Server error'});
  }
});

/**
 * @swagger
 * /favteam:
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
    res.send(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Server error'});
  }
});

/**
 * @swagger
 * /getfav:
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
    res.send(response.data);
  } catch (e) {
    res.sendStatus(500);
  }
});

/**
 * @swagger
 * /postFormations:
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

    res.send(response.data);
  } catch (e) {
    res.sendStatus(500);
  }
});

/**
 * @swagger
 * /getFormations:
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
    const resp = (await axios.post('http://localhost:3001/user/getfav/formation', {
      username: req.body.username,
      pwd: req.body.pwd,
    })).data;
    res.send(resp.data.formations);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/removePlayer', async (req,res)=>{
  try {
    const response = await axios.post("http://localhost:3001/user/fav/removePlayer", req.body);
    res.send(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Errore nel server'});
  }
})

router.post('/removeTeam', async (req,res)=>{
  try {
    const response = await axios.post("http://localhost:3001/user/fav/removeTeam", req.body);
    res.send(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).send({error: 'Errore nel server'});
  }
})
module.exports = router;
