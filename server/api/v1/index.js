const express = require('express');

const router = express.Router();

router.use('/domains', require('./domains'));

module.exports = router;
