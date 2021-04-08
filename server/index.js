require('dotenv').config();

const
  express = require('express'),
  socket = require('socket.io'),
  app = express(),
  server = require('http').createServer(app),
  io = socket(server),
  port = 3001

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

server.listen(process.env.PORT || port)

io.on('connection', socket => {
  socket.on('test', data => console.log(data))
})
