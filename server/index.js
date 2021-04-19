require('dotenv').config()

const 
  http = require('http'),
  express = require('express'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io')(server),
  cors = require('cors'),
  mongoose = require('mongoose'),
  db = mongoose.connection,
  router = require('./src/router'),
  jwt = require('jsonwebtoken')

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

db.once('open', _ => {
  console.log('Connected to MongoDB!')
})

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(router)

const 
  Room = require('./src/models/room'),
  User = require('./src/models/user'),
  getData = require('./src/utils/getData'),
  calcDist = require('./src/utils/calcDist'),
  roundNum = require('./src/utils/roundNum')

io.on('connect', (socket) => {  
  let 
    currentRoom,
    roomData,
    connectedUser

  const watchRoom = async (room) => {
    const roomDB = await Room.watch({ _id: room })
  
    roomDB.on('change', async () => {
      const data = await Room.findOne({ _id: room })
      roomData = data
      io.to(room).emit('roomData', { ...data._doc })
    })
  }

  socket.on('join', async ({ token, room }, callback) => {
    watchRoom(room)
    currentRoom = room

    await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (decoded) {
        const data = await User.findOne({ _id: decoded.id })
        connectedUser = data
      }
    })

    if (!connectedUser) return
    
    const userData = {
      id: connectedUser.id,
      username: connectedUser.username,
      points: 0
    }

    await Room.updateOne({ _id: room }, {
      $addToSet: { users: userData }
    }, err => err && console.log(err))

    roomData = await Room.findOne({ _id: currentRoom }, err => err && console.log(err))

    socket.join(room)
    socket.emit('message', { user: 'admin', text: `${connectedUser.username}, welcome to room ${roomData.name}.`})
    socket.broadcast.to(room).emit('message', { user: 'admin', text: `${connectedUser.username} has joined!` })
    io.to(room).emit('roomData', { ...roomData._doc })
    callback(connectedUser.username)
  })

  socket.on('sendMessage', async (message, callback) => {
    if (!connectedUser) return

    const location = await getData(`http://api.positionstack.com/v1/forward?access_key=${process.env.API_KEY}&query=${message}`)

    if (!location.data[0] || location.data[0].type !== 'locality') {
      io.to(currentRoom).emit('message', { user: connectedUser.username, text: message })
      callback()
      return
    }

    const { latitude, longitude } = location.data[0]
    const dist = roundNum(calcDist([latitude, longitude], roomData.coords[roomData.round].coords), 0)
    
    if (isNaN(dist)) {
      io.to(currentRoom).emit('message', { user: connectedUser.username, text: message })
      callback()
      return
    }

    if (dist < 10) {
      io.to(currentRoom).emit('message', { user: 'admin', text: `${connectedUser.username} guessed the right city, it was ${roomData.coords[roomData.round].city}!` })
      Room.updateOne({ 'users.id': connectedUser.id }, { 
        $inc: { 'users.$.points': 10 }
      }, err => err && console.log(err))

      Room.updateOne({ _id: currentRoom }, { 
        $inc: { round: 1 }
      }, err => err && console.log(err))
    } else {
      io.to(currentRoom).emit('message', { user: connectedUser.username, text: message })
      socket.emit('message', { user: 'admin', text: `You are off by ${dist} km`})
    }
    
    callback()
  })

  socket.on('disconnect', async () => {
    if (!connectedUser || !roomData) return
    
    await Room.updateOne({ _id: currentRoom }, {
      $pull: { users: { id: connectedUser.id } }
    }, err => err && console.log(err))

    io.to(currentRoom).emit('message', { user: 'admin', text: `${connectedUser.username} has left.` })
  })
})

server.listen(process.env.PORT || 3001, () => console.log(`Server has started.`))
