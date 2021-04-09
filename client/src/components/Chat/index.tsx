import { useState, useEffect, FormEvent } from 'react'
import { Socket } from 'socket.io-client'
import { Input, Messages } from '@components'
import './Chat.css'

interface Props {
  socket: Socket,
  name: string
}

type Users = {
  id: string, 
  points: number, 
  username: string
}

const Chat = ({ socket, name }: Props) => {
  const [room, setRoom] = useState<string>()
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])
  const [users, setUsers] = useState<Users[]>()

  useEffect(() => {
    socket.on('message', (message: string) => {
      setMessages(msgs => [ ...msgs, message ])
    })
  }, [])

  useEffect(() => {
    socket.on('roomData', ({ users, room }: { users: Users[], room: string }) => {
      setRoom(room)
      setUsers(users)
    })
  })

  const sendMessage = (e: FormEvent) => {
    e.preventDefault()

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <div className='outerContainer'>
      <div className='container'>
        {room && <h2>{room}</h2>}
        {users && users.map(user => <p key={user.id}>{user.username}: {user.points}</p>)}
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default Chat
