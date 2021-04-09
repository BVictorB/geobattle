const 
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

const roomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rounds: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  users: {
    type: Array
  }
})

const Room = mongoose.model('rooms', roomSchema)

module.exports = Room
