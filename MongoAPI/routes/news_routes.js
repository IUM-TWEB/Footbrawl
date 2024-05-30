const ctrl = require('../middlewares/news_mid')

const express = require('express')

const router = express.Router();

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get specific news by ID
 *     description: Retrieves the news by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: filter news by id.
 *         type: integer
 *     responses:
 *       '200':
 *         description: OK. News received.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/:id', ctrl.getById);
/**
 * @swagger
 * /news:
 *  get:
 *    summary: Get all the news in the database
 *    description: Get all the news in the database
 *    responses:
 *      '200':
 *        description: Ok. List of news
 *        schema:
 *          type: object
 *          properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *             username:
 *               type: string
 *               description: The user name.
 * */
router.get('/', ctrl.getAll);

module.exports = router;
