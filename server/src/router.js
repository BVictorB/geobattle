const router = require('express').Router()

const
  createroom = require('./routes/createroom'),
  getroom = require('./routes/getroom'),
  login = require('./routes/login'),
  register = require('./routes/register'),
  auth = require('./routes/auth')

const
  authenticate = require('./middleware/authenticate')

router
  .post('/createroom', createroom)
  .get('/getroom/:id', getroom)
  .get('/auth', authenticate, auth)
  .post('/register', register)
  .post('/login', login)

module.exports = router
