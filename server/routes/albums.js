const router = require('express').Router();
const db = require('../db');
const { Album } = db.models;

router.get('/', (req, res, next) => {
  Album.findAll()
    .then( albums => res.send(albums))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Album.create(req.body)
    .then( album => res.send(album))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Album.findById(req.params.id)
    .then( album => {
      album.destroy();
    })
    .then( () => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Album.findById(req.params.id)
    .then( album => {
      Object.assign(album, req.body);
      return album.save();
    })
    .then( album => res.send(album))
    .catch(next);
});

module.exports = router;
