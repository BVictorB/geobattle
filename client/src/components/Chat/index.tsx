import { useState, useEffect, FormEvent } from 'react'
import { Socket } from 'socket.io-client'
import { Input, Messages } from '@components'
import './Chat.css'

interface Props {
  socket: Socket,
  name: string
}

const Chat = ({ socket, name }: Props) => {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])
  const [users, setUsers] = useState<string[]>([])
  
  useEffect(() => {
    socket.on('message', (message: string) => {
      setMessages(msgs => [ ...msgs, message ])
    })
    
    socket.on('roomData', ({ users }: { users: string[] }) => {
      setUsers(users)
    })
}, [])

  const sendMessage = (e: FormEvent) => {
    e.preventDefault()

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <div className='outerContainer'>
      <div className='container'>
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default Chat
