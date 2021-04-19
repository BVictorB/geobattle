import { FC, useState, useEffect, FormEvent } from 'react'
import { Socket } from 'socket.io-client'
import { ChatInput, ChatMessages } from '@components'
import { MessageInterface } from '@interfaces'
import './Chat.scss'

interface Props {
  socket: Socket,
  name: string
}

const Chat:FC<Props> = ({ socket, name }) => {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessageInterface[]>([])

  useEffect(() => {
    socket.on('message', (message: MessageInterface) => {
      setMessages(prevState => [ ...prevState, message ])
    })
  }, [socket])

  const sendMessage = (e: FormEvent) => {
    e.preventDefault()

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <div className='m-chat'>
      {messages && <ChatMessages messages={messages} name={name} />}
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  )
}

export default Chat
