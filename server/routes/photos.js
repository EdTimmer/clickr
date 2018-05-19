const router = require('express').Router();
const db = require('../db');
const { Photo } = db.models;

router.get('/', (req, res, next) => {
  Photo.findAll()
    .then( photos => res.send(photos))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Photo.create(req.body)
    .then( photo => res.send(photo))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Photo.findById(req.params.id)
    .then( photo => {
      photo.destroy();
    })
    .then( () => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Photo.findById(req.params.id)
    .then( photo => {
      Object.assign(photo, req.body);
      return photo.save();
    })
    .then( photo => res.send(photo))
    .catch(next);
});

module.exports = router;
