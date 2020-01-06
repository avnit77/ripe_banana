const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: { type: Date },
  pob: { type: String }
});

schema.virtual('day')
  .get(function() {
    return (this.dateOfEvent).toLocaleString('default', { weekday: 'long' });
  })
  .set(function() {
    let day = this.dateOfEvent.getDay();
    this.dateOfEvent.setDate(day);
  });

schema.virtual('month')
  .get(function() {
    return (this.dateOfEvent).toLocaleString('default', { month: 'long' });
  })
  .set(function() {
    let newMonth = this.dateOfEvent.getMonth();
    this.dateOfEvent.setMonth(newMonth - 1);
  });

schema.virtual('year')
  .get(function() {
    return this.dateOfEvent.getFullYear();
  })
  .set(function() {
    let year = this.dateOfEvent.getFullYear();
    this.dateOfEvent.setYear(year - 1);
  });

module.exports = mongoose.model('Actor', schema);
