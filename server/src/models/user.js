const 
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  hashPassword = require('../utils/hashPassword')

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', hashPassword)
const User = mongoose.model('users', userSchema)

module.exports = User
