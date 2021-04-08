const Lobby = require('../models/lobby')

const createroom = (req, res) => {
  const lobby = new Lobby()
  lobby.rounds = req.body.rounds
  lobby.time = req.body.time

  lobby.save((err, lobby) => {
    !err && res.json({ id: lobby.id })
  })
}

module.exports = createroom
