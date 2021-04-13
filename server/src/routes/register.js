const User = require('../models/user')

const register = (req, res) => {
  const { email, password } = req.body

  if (email && password) {
    const user = new User()
    user.email = email
    user.password = password

    user.save((err, user) => {
      !err && console.log(user)
    })
  }
}

module.exports = register
