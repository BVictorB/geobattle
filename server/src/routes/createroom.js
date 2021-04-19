const 
  Room = require('../models/room'),
  Location = require('../models/location')

const createroom = async (req, res) => {
  const locations = await Location.find({})
  const pickedLocations = locations.sort(() => .5 - Math.random()).slice(0, req.body.rounds)

  const room = new Room()
  room.name = req.body.name
  room.rounds = req.body.rounds
  room.time = req.body.time
  room.coords = pickedLocations

  room.save((err, room) => {
    !err && res.json({ 
      auth: true,
      id: room.id 
    })
  })
}

module.exports = createroom
