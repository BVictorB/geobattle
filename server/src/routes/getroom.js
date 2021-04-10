const Room = require('../models/room')
const ObjectID = require('mongoose').Types.ObjectId

const getroom = async (req, res) => {
  const id = req.params.id
  if (ObjectID.isValid(id)) {
    const room = await Room.findOne({ _id: id })
    res.json(room)
  } else {
    // TODO: add error handling and give feedback to user.
    console.log('Invalid objectid!')
  }
}

module.exports = getroom
