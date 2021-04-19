const 
  Room = require('../models/room'),
  Location = require('../models/location')

const createroom = async (req, res) => {
  const { name, rounds, time, continent } = req.body
  const locations = await Location.find({ continent: continent === 'all' ? { $exists: true } : continent })
  const pickedLocations = locations.sort(() => .5 - Math.random()).slice(0, rounds)

  const room = new Room()
  room.name = name
  room.rounds = rounds
  room.time = time
  room.coords = pickedLocations

  room.save((err, room) => {
    !err && res.json({ 
      auth: true,
      id: room.id 
    })
  })
}

module.exports = createroom
