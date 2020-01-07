require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

describe('film routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let film;
  let studio;
  let actor;

  beforeEach(async() => {
    studio = await Studio.create({
      name: 'Studio Name'
    });

    actor = await Actor.create({
      name: 'Actor Name'
    });

    film = await Film.create({
      title: 'Film Title',
      studio: studio.id,
      released: 2015,
      cast: [{
        role: 'Star',
        actor: actor.id
      }]
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all films', () => {
    return request(app)
      .get('/api/v1/films')
      .then(films => {
        expect(films.body).toEqual([{
          _id: film.id,
          title: 'Film Title',
          studio: {
            _id: studio.id,
            name: 'Studio Name'
          },
          released: 2015,
          cast: [{
            _id: expect.any(String),
            role: 'Star',
            actor: {
              _id: actor.id,
              name: 'Actor Name'
            }
          }],
          __v: 0
        }]);
      });
  });

  it('gets a film by id', () => {
    return request(app)
      .get(`/api/v1/films/${film.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: film.id,
          title: 'Film Title',
          studio: {
            _id: studio.id,
            name: 'Studio Name'
          },
          released: 2015,
          cast: [{
            _id: expect.any(String),
            role: 'Star',
            actor: {
              _id: actor.id,
              name: 'Actor Name'
            }
          }],
          __v: 0
        });
      });
  });
});
