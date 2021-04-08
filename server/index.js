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

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(router)

const location = { 
  coords: [48.8566969, 2.3514616],
  city: 'paris'
}

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if(error) return callback(error)

    socket.join(user.room)

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`})
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
    io.to(user.room).emit('coords', location)

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    if (message.toLowerCase().includes(location.city)) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} guessed the right city!` })
    } else {
      io.to(user.room).emit('message', { user: user.name, text: message })
    }
    
    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` })
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
    }
  })
})

server.listen(process.env.PORT || 3001, () => console.log(`Server has started.`))
