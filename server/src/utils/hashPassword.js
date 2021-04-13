const 
  bcrypt = require('bcrypt'),
  saltRounds = 10

function hashPassword (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const hash = salt => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        console.log(err)
      } else {
        this.password = hash
        next()
      }
    })
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.log(err)
    } else {
      hash(salt)
    }
  })
}

module.exports = hashPassword
