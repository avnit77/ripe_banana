// const mongoose = require('mongoose');
const Review = require('./Review');

describe('Review model', () => {
  it('has a required rating', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });
  it('has a required review', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.review.message).toEqual('Path `review` is required.');
  });
});
