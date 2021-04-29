const getData = require('../utils/getData')

const getlocation = async (req, res) => {
  const { lat, lon } = req.body

  if (!lat || !lon) {
    console.log('No lat and/or lon')
    return
  }

  const location = await getData(`http://api.positionstack.com/v1/reverse?access_key=${process.env.API_KEY}&query=${lat},${lon}`)
  if (!location || location.error) return
  const { locality, continent } = location.data?.[0]
  
  if (locality && continent) {
    res.json({
      city: locality,
      continent
    })
  }
}

module.exports = getlocation
