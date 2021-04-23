const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { email, password } = req.body
  const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (!email || !password) {
    res.json({
      auth: false,
      message: 'Please fill in all fields.'
    })
    return
  }

  if (!emailValidator.test(email)) {
    res.json({
      auth: false,
      message: 'Please fill in a valid email adress.'
    })
    return
  }

  const checkPassword = (err, matches, id) => {
    if (err) {
      res.json({
        auth: false,
        message: 'Something went wrong.'
      })
    } else if (matches) {
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3600
      })

      res.json({
        auth: true,
        token
      })
    } else if (!matches) {
      res.json({
        auth: false,
        message: 'Wrong password.'
      })
    }
  }

  if (email && password) {
    const user = await User.findOne({ email: email })

    if (!user) {
      res.json({
        auth: false,
        message: 'Could not find email adress.'
      })
      return
    }

    bcrypt.compare(password, user.password, (err, matches) => checkPassword(err, matches, user.id))
  }
}

module.exports = login
