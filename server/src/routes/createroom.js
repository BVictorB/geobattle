const Room = require('../models/room')

const locations = [
  {
    coords: [48.8566969, 2.3514616],
    city: 'paris'
  },
  {
    coords: [52.3727598, 4.8936041],
    city: 'amsterdam'
  },
  {
    coords: [41.3828939, 2.1774322],
    city: 'barcelona'
  },
  {
    coords: [52.5170365, 13.3888599],
    city: 'berlin'
  },
  {
    coords: [48.858093, 2.294694],
    city: 'paris'
  },
  {
    coords: [55.7504461, 37.6174943],
    city: 'moscow'
  },
  {
    coords: [41.8933203, 12.4829321],
    city: 'rome'
  },
  {
    coords: [51.5073219, -0.1276474],
    city: 'london'
  },
  {
    coords: [50.8465573, 4.351697],
    city: 'brussels'
  },
  {
    coords: [38.7077507, -9.1365919],
    city: 'lisbon'
  },
  {
    coords: [40.7127281, -74.0060152],
    city: 'new york'
  },
  {
    coords: [37.9839412, 23.7283052],
    city: 'athens'
  }
]

const createroom = (req, res) => {
  const pickedLocations = locations.sort(() => .5 - Math.random()).slice(0, req.body.rounds)

  const room = new Room()
  room.name = req.body.name
  room.rounds = req.body.rounds
  room.time = req.body.time
  room.coords = pickedLocations

  room.save((err, room) => {
    !err && res.json({ id: room.id })
  })
}

module.exports = createroom