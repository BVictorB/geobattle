const 
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

const locationSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  continent: {
    type: String,
    required: true
  },
  coords: {
    type: Array,
    required: true
  }
})

const Location = mongoose.model('locations', locationSchema)

module.exports = Location
