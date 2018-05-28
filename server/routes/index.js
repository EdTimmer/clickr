const router = require('express').Router();
const db = require('../db');
const { User } = db.models;

router.use((req, res, next) => {
  const token = req.headers.authorization;
  console.log('token is:', token);
  if (!token) {
    // console.log('do not have a token!')
    return next();
  }
  User.exchangeTokenForUser(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => next({ status: 401 }));
})

router.use('/users', require('./users'));
router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));
router.use('/sessions', require('./sessions'));
router.use('/people', require('./people'));

module.exports = router;
