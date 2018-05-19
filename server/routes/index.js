const router = require('express').Router();
// const db = require('../db');

router.use('/users', require('./users'));
router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));

module.exports = router;
