const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
  .post('/', (req, res, next) => {
    Actor
      .create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })


  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .populate('name')
      .then(actor => res.send(actor))
      .catch(next);
  });

// .get('/', (req, res, next) => {
//   Studio
//     .find()
//     .select({ notes: false })
//     .then(studios => res.send(studios));
// })
