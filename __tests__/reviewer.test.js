require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');

describe('reviewers routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });


  let reviewer;

  beforeEach(async() => {
    reviewer = await Reviewer.create({
      name: 'Reviewer Name',
      company: 'Company Name'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Reviewer Name',
        company: 'Company Name'
      });
  });

  it('gets all reviewers', () => {
    return request(app)
      .get('/api/v1/reviewers')
      .then(reviewers => {
        expect(reviewers.body).toEqual([{
          _id: reviewer.id,
          name: 'Reviewer Name',
          company: 'Company Name',
          __v: 0
        }]);
      });
  });

  it('gets a reviewer by id', () => {
    return request(app)
      .get(`/api/v1/reviewers/${reviewer.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer.id,
          name: 'Reviewer Name',
          company: 'Company Name',
          __v: 0
        });
      });
  });
  it('updates a reviewer', () => {
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer.id}`)
      .send({ company: 'New Company' })
      .then(res => {
        expect(res.body.company).toEqual('New Company');
      });
  });
  it('deletes a reviewer with no reviews', () => {
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer.id,
          name: 'Reviewer Name',
          company: 'Company Name',
          __v: 0
        });
      });
  });
});
