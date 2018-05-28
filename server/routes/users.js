const router = require('express').Router();
const db = require('../db');
const { User } = db.models;
const { authorized, isCorrectUser, isAdmin } = require('./authFuncs');

router.get('/', authorized, isAdmin, (req, res, next) => {
  User.findAll()
    .then( users => res.send(users))
    .catch(next);
});

// router.post('/', (req, res, next) => {
//   User.create(req.body)
//     .then( user => res.send(user))
//     .catch(next);
// });

router.delete('/:id', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  User.findById(req.params.id)
    .then( user => {
      user.destroy();
    })
    .then( () => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', authorized, isCorrectUser('params', 'id'), (req, res, next) => {
  User.findById(req.params.id)
    .then( user => {
      // Object.assign(user, req.body);
      return user.update(req.body);
    })
    .then( user => res.send(user))
    .catch(next);
});

module.exports = router;
