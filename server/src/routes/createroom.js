const 
  Room = require('../models/room'),
  Location = require('../models/location')

const createroom = async (req, res) => {
  const { name, rounds, time, continent } = req.body
  
  let roundsAmount
  switch (rounds) {
    case 'short':
      roundsAmount = 5
    break
    case 'regular':
      roundsAmount = 10
    break
    case 'long':
      roundsAmount = 15
    break
  }

  let timeAmount
  switch (time) {
    case 'short':
      timeAmount = 30
    break
    case 'regular':
      timeAmount = 60
    break
    case 'long':
      timeAmount = 90
    break
  }

  const locations = await Location.find({ continent: continent === 'all' ? { $exists: true } : continent })
  const pickedLocations = locations.sort(() => .5 - Math.random()).slice(0, roundsAmount)

  const room = new Room()
  room.name = name
  room.rounds = roundsAmount
  room.time = timeAmount
  room.coords = pickedLocations

  room.save((err, room) => {
    !err && res.json({ 
      auth: true,
      id: room.id 
    })
  })
}

module.exports = createroom
