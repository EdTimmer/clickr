const router = require('express').Router();
const db = require('../db');
const { Person } = db.models;

router.get('/', (req, res, next) => {
  Person.findAll()
    .then( people => res.send(people))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Person.create(req.body)
    .then( person => res.send(person))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then( person => {
      person.destroy();
    })
    .then( () => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then( person => {
      // Object.assign(person, req.body);
      return person.update(req.body);
    })
    .then( person => res.send(person))
    .catch(next);
});

module.exports = router;
