const User = require('../models/user')

const getleaderboards = async (req, res) => {
  const leaderboards = await User.find({}).sort({ points: -1 }).limit(5)
  const formattedLeaderboards = leaderboards.map(user => ({ username: user.username, points: user.points }))
  leaderboards && res.json(formattedLeaderboards)
}

module.exports = getleaderboards
