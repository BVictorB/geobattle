const User = require('../models/user')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { email, username, password, repeatedPassword } = req.body

  if (!email || !username || !password || !repeatedPassword) {
    res.json({
      auth: false,
      message: 'Please fill in all fields.'
    })
    return
  }

  if (password !== repeatedPassword) {
    res.json({
      auth: false,
      message: 'The password do not match.'
    })
    return
  }

  const foundEmail = await User.findOne({ email: email })
  
  if (foundEmail) {
    res.json({
      auth: false,
      message: 'This email adress is already registered.'
    })
    return
  }

  const foundUser = await User.findOne({ username: username })
  
  if (foundUser) {
    res.json({
      auth: false,
      message: 'This username is already taken.'
    })
    return
  }

  const user = new User()
  user.email = email
  user.username = username
  user.password = password

  user.save((err, user) => {
    if (!err) {
      const userid = user._id
      const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
        expiresIn: 3600
      })

      res.json({
        auth: true,
        token
      })
    }
  })
}

module.exports = register
