const ctrl = require('../middlewares/news_mid')

const express = require('express')

const router = express.Router();

router.get('/:id', ctrl.getById);

module.exports = router;
