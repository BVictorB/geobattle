const 
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

const lobbySchema = new Schema({
  rounds: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
})

const Lobby = mongoose.model('lobbies', lobbySchema)

module.exports = Lobby
