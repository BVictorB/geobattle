require('dotenv').config();

const 
  http = require('http'),
  express = require('express'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io')(server),
  cors = require('cors'),
  mongoose = require('mongoose'),
  db = mongoose.connection,
  router = require('./src/router')

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

const location = { 
  coords: [48.8566969, 2.3514616],
  city: 'paris'
}

const Room = require('./src/models/room')

io.on('connect', (socket) => {  
  let currentRoom

  socket.on('join', async ({ name, room }, callback) => {
    currentRoom = room
    
    const userData = {
      id: socket.id,
      username: name,
      points: 0
    }

    await Room.updateOne({ _id: room }, {
      $addToSet: { users: userData }
    }, err => err && console.log(err))

    const roomDB = await Room.findOne({ _id: currentRoom }, err => err && console.log(err))
    const thisUser = roomDB.users.find(user => user.id === socket.id)

    socket.join(room)
    socket.emit('message', { user: 'admin', text: `${thisUser.username}, welcome to room ${room}.`})
    socket.broadcast.to(room).emit('message', { user: 'admin', text: `${thisUser.username} has joined!` })

    io.to(room).emit('roomData', { room: room, users: 'temp' })
    io.to(room).emit('coords', location)

    callback()
  })

  socket.on('sendMessage', async (message, callback) => {
    const roomDB = await Room.findOne({ _id: currentRoom })
    const thisUser = roomDB.users.find(user => user.id === socket.id)

    if (message.toLowerCase().includes(location.city)) {
      io.to(currentRoom).emit('message', { user: 'admin', text: `${thisUser.username} guessed the right city!` })
    } else {
      io.to(currentRoom).emit('message', { user: thisUser.username, text: message })
    }
    
    callback()
  })

  socket.on('disconnect', async () => {
    const roomDB = await Room.findOne({ _id: currentRoom })
    const thisUser = roomDB.users.find(user => user.id === socket.id)

    Room.updateOne({ _id: currentRoom }, {
      $pull: { users: { id: socket.id } }
    }, err => err && console.log(err))

    io.to(currentRoom).emit('message', { user: 'admin', text: `${thisUser.username} has left.` })
    io.to(currentRoom).emit('roomData', { room: currentRoom, users: 'temp'})
  })
})

server.listen(process.env.PORT || 3001, () => console.log(`Server has started.`))
