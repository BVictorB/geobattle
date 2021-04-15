const Room = require('../models/room')
const ObjectID = require('mongoose').Types.ObjectId

const getroom = async (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(400).send('Invalid objectid!')
    return 
  }

  const room = await Room.findOne({ _id: id })

  if (!room) {
    res.status(400).send('Room does not exist!')
    return
  }

  res.status(200).json({
    auth: true,
    room
  })
}

module.exports = getroom
