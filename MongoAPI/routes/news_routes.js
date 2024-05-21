const ctrl = require('../middlewares/news_mid')

const express = require('express')

const router = express.Router();

router.get('/:id', ctrl.getById);

router.get('/', ctrl.getAll);

module.exports = router;
