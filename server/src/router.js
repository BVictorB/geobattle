const router = require('express').Router()

const
  createroom = require('./routes/createroom'),
  getroom = require('./routes/getroom'),
  login = require('./routes/login'),
  register = require('./routes/register'),
  auth = require('./routes/auth'),
  rooms = require('./routes/rooms'),
  getlocation = require('./routes/getlocation'),
  getlocations = require('./routes/getlocations')

const
  authenticate = require('./middleware/authenticate')

router
  .post('/createroom', authenticate, createroom)
  .get('/getroom/:id', authenticate, getroom)
  .get('/auth', authenticate, auth)
  .post('/register', register)
  .post('/login', login)
  .get('/rooms', authenticate, rooms)
  .post('/getlocation', getlocation)
  .get('/getlocations', getlocations)

module.exports = router
