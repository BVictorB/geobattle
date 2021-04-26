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
  },
  coords: {
    type: Array
  },
  round: {
    type: Number,
    default: 0
  },
  timeleft: {
    type: Number,
    default: 0
  },
  started: {
    type: Boolean,
    default: false
  },
  finished: {
    type: Boolean,
    default: false
  }
})

const Room = mongoose.model('rooms', roomSchema)

module.exports = Room
