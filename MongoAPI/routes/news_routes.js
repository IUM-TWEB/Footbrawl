const express = require('express');
const ctrl = require('../middlewares/news_mid');
const router = express.Router();

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     tags:
 *       - News
 *     summary: Get specific news by ID
 *     description: Retrieves the news by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier for the news item.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK. News received.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsResponse'
 *       '404':
 *         description: News not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /news:
 *   get:
 *     tags:
 *       - News
 *     summary: Get all the news
 *     description: Retrieves all news items from the database.
 *     responses:
 *       '200':
 *         description: OK. List of news.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsResponse'
 *       '404':
 *         description: No news found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/', ctrl.getAll);

module.exports = router;
