require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');

describe('actor routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let actor;
  
  beforeEach(async() => {
    actor = await Actor.create({
      name: 'Actor Name',
      dob: 'January 1, 1990',
      pob: 'Place'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Actor Name',
        dob: 'January 1, 1990',
        pob: 'Place'
      });
  });
});
