const Room = require('../models/room')

const getroom = async (req, res) => {
  const room = await Room.findOne({ _id: req.params.id })
  res.json(room)
}

module.exports = getroom
