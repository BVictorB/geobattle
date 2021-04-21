const Location = require('../models/location')

const getlocations = async (req, res) => {
  const locations = await Location.find({}).sort({ city: 1 })
  res.json(locations)
}

module.exports = getlocations
