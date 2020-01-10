
const { getReview, getFilm, getReviewer } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const chance = require('chance').Chance();
const Review = require('../lib/models/Review');

describe('review routes', () => {
  it('creates a review', async() => {
    const reviewer = await getReviewer();
    const film = await getFilm();
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 5,
        reviewer: reviewer._id,
        review: 'good',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          rating: 5,
          reviewer: reviewer._id.toString(),
          review: 'good',
          film: film._id.toString()
        });
      });
  });

  it('deletes a review', async() => {
    const review = await getReview();
    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
  });
  it('limits to 100 reviews', async() => {
    const reviewer = await getReviewer();
    const film = await getFilm();

    await Review.create([...Array(101)].map(() => ({
      rating: 4,
      reviewer: reviewer._id,
      review: chance.string({ length: 140 }),
      film: film._id
    })));
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });
});
