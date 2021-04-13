const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    res.send('No token')
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'Failed to authenticate' })
      } else {
        req.userID = decoded.id
        next()
      }
    })
  }
}

module.exports = authenticate
