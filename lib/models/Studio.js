const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: addressSchema
});

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio'
});


module.exports = mongoose.model('Studio', schema);

