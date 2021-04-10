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

const watchRoom = async (room) => {
  const roomDB = await Room.watch({ _id: room })

  roomDB.on('change', async () => {
    const data = await Room.findOne({ _id: room })
    io.to(room).emit('roomData', { ...data._doc })
  })
}

io.on('connect', (socket) => {  
  let currentRoom

  socket.on('join', async ({ name, room }, callback) => {
    watchRoom(room)
    currentRoom = room
    
    const userData = {
      id: socket.id,
      username: name,
      points: 0
    }

    await Room.updateOne({ _id: room }, {
      $addToSet: { users: userData }
    }, err => err && console.log(err))

    const data = await Room.findOne({ _id: currentRoom }, err => err && console.log(err))
    const thisUser = data.users.find(user => user.id === socket.id)

    socket.join(room)
    socket.emit('message', { user: 'admin', text: `${thisUser.username}, welcome to room ${data.name}.`})
    socket.broadcast.to(room).emit('message', { user: 'admin', text: `${thisUser.username} has joined!` })
    io.to(room).emit('coords', location)

    callback()
  })

  socket.on('sendMessage', async (message, callback) => {
    const roomDB = await Room.findOne({ _id: currentRoom })
    const thisUser = roomDB.users.find(user => user.id === socket.id)

    if (message.toLowerCase().includes(location.city)) {
      io.to(currentRoom).emit('message', { user: 'admin', text: `${thisUser.username} guessed the right city!` })
      Room.updateOne({ 'users.id': socket.id }, { 
        $inc: { 'users.$.points': 10 }
      }, err => err && console.log(err))
    } else {
      io.to(currentRoom).emit('message', { user: thisUser.username, text: message })
    }
    
    callback()
  })

  socket.on('disconnect', async () => {
    const roomDB = await Room.findOne({ _id: currentRoom })

    if (roomDB) {
      const thisUser = roomDB.users.find(user => user.id === socket.id)
    
      await Room.updateOne({ _id: currentRoom }, {
        $pull: { users: { id: socket.id } }
      }, err => err && console.log(err))
  
      io.to(currentRoom).emit('message', { user: 'admin', text: `${thisUser.username} has left.` })
    }
  })
})

server.listen(process.env.PORT || 3001, () => console.log(`Server has started.`))
