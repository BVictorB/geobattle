const Location = require('../models/location')

const getlocations = async (req, res) => {
  const locations = await Location.find({})
  res.json(locations)
}

module.exports = getlocations
