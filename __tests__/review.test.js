require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Review = require('../lib/models/Review');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Reviewer = require('../lib/models/Reviewer');

describe('Review routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let review;
  let film;
  let studio;
  let reviewer;

  beforeEach(async() => {
    studio = await Studio.create({
      name: 'Studio Name'
    });

    reviewer = await Reviewer.create({
      name: 'Reviewer Name',
      company: 'Company Name'
    });

    film = await Film.create({
      title: 'Film Title',
      studio: studio.id,
      released: 2015,
    });

    review = await Review.create({
      rating: 5,
      reviewer: reviewer.id,
      review: 'good',
      film: {
        _id: film.id,
        title: 'Film Title'
      }
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all reviews', () => {
    return request(app)
      .get('/api/v1/reviews')
      .then(reviews => {
        expect(reviews.body).toEqual([{
          _id: review.id,
          rating: 5,
          reviewer: reviewer.id,
          review: 'good',
          film: {
            _id: film.id,
            title: 'Film Title'
          },
          __v: 0
        }]);
      });
  });

  it('gets a review by id', () => {
    return request(app)
      .get(`/api/v1/reviews/${review.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: review.id,
          rating: 5,
          reviewer: reviewer.id,
          review: 'good',
          film: {
            _id: film.id,
            title: 'Film Title'
          },
          __v: 0
        });
      });
  });
  it('deletes a review', () => {
    return request(app)
      .delete(`/api/v1/reviews/${review.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: review.id,
          rating: 5,
          reviewer: reviewer.id,
          review: 'good',
          film: film.id,
          __v: 0
        });
      });
  });
});
