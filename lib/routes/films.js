const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  // .post('/', (req, res, next) => {
  //   Film
  //     .create(req.body)
  //     .then(film => res.send(film))
  //     .catch(next);
  // })
  .get('/', (req, res, next) => {
    Film
      .find()
      .populate('studio', { name: true, _id: true })
      .populate('cast.actor', { name: true, _id: true })
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate('studio', { name: true, _id: true })
      .populate('cast.actor', { name: true, _id: true })
      .then(film => res.send(film))
      .catch(next);
  });
