const Room = require('../models/room')

const createroom = (req, res) => {
  const room = new Room()
  room.name = req.body.name
  room.rounds = req.body.rounds
  room.time = req.body.time

  room.save((err, room) => {
    !err && res.json({ id: room.id })
  })
}

module.exports = createroom
