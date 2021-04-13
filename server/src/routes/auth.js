const auth = (req, res) => {
  res.json({ auth: true, id: req.userID })
}

module.exports = auth
