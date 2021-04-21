const Location = require('../models/location')

const removelocation = async (req, res) => {
  const id = req.body.id
  await Location.deleteOne({ _id: id })
  const locations = await Location.find({}).sort({ city: 1 })
  res.json(locations)
}

module.exports = removelocation
