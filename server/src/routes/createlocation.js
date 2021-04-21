const Location = require('../models/location')

const createlocation = async (req, res) => {
  const { coords, city, continent } = req.body

  const searchCity = await Location.find({ city: city })
  if (searchCity.length) return

  const location = new Location()
  location.coords = coords
  location.city = city
  location.continent = continent

  location.save(async (err, location) => {
    if (err) return
    const locations = await Location.find({}).sort({ city: 1 })
    res.json(locations)
  })
}

module.exports = createlocation
