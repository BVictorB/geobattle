const router = require('express').Router()

const
  createroom = require('./routes/createroom'),
  getroom = require('./routes/getroom')

router
  .post('/createroom', createroom)
  .get('/getroom/:id', getroom)

module.exports = router
