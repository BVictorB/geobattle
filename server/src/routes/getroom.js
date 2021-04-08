const Lobby = require('../models/lobby')

const getroom = async (req, res) => {
  const lobby = await Lobby.findOne({ _id: req.params.id })
  res.json(lobby)
}

module.exports = getroom
