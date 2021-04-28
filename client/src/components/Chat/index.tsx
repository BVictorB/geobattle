import { FC, useState, useEffect, FormEvent } from 'react'
import { Socket } from 'socket.io-client'
import { ChatInput, ChatMessages, RoomInfo } from 'components'
import { MessageInterface } from 'interfaces'
import './Chat.scss'

interface Props {
  socket: Socket,
  name: string | null
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
      {socket && <RoomInfo socket={socket} />}
      <div className='m-chat__container'>
        {messages && name && <ChatMessages messages={messages} name={name} />}
      </div>
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  )
}

export default Chat
