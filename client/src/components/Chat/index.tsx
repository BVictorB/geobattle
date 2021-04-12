import { useState, useEffect, FormEvent } from 'react'
import { Socket } from 'socket.io-client'
import { ChatInput, Messages } from '@components'
import { MessageInterface } from '@interfaces'
import './Chat.scss'

interface Props {
  socket: Socket,
  name: string
}

const Chat = ({ socket, name }: Props) => {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessageInterface[]>([])

  useEffect(() => {
    socket.on('message', (message: MessageInterface) => {
      setMessages(prevState => [ ...prevState, message ])
    })
  }, [])

  const sendMessage = (e: FormEvent) => {
    e.preventDefault()

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <>
      {messages && <Messages messages={messages} name={name} />}
      <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </>
  )
}

export default Chat
