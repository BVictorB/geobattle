const Room = require('../models/room')

const rooms = async (req, res) => {
  const rooms = await Room.find({})

  if (!rooms) {
    res.status(400).send('Could not find rooms')
  }

  res.status(200).json({ auth: true, data: rooms })
}

module.exports = rooms
