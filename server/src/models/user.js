const 
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  hashPassword = require('../utils/hashPassword')

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  }
})

userSchema.pre('save', hashPassword)
const User = mongoose.model('users', userSchema)

module.exports = User
