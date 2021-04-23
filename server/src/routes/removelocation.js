const Location = require('../models/location')

const removelocation = async (req, res) => {
  const id = req.body.id
  await Location.deleteOne({ _id: id })
  const locations = await Location.find({}).sort({ city: 1 })
  res.json({
    err: false,
    message: 'Location successfully removed!',
    locations
  })
}

module.exports = removelocation
