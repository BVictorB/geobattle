const User = require('../models/user')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { email, password } = req.body

  if (email && password) {
    const foundUser = await User.findOne({ email: email })
    
    if (foundUser) {
      res.json({
        auth: false,
        message: 'User already exists.'
      })
      return
    }

    const user = new User()
    user.email = email
    user.password = password

    user.save((err, user) => {
      if (!err) {
        const userid = user._id
        const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
          expiresIn: 3600
        })
  
        res.json({
          auth: true,
          token,
          message: 'User signed in.'
        })
      }
    })
  }
}

module.exports = register
