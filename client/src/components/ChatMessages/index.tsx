import { FC, useRef, useEffect } from 'react'
import { ChatMessage } from '@components'
import { MessageInterface } from '@interfaces'
import './ChatMessages.scss'

interface Props {
  messages: MessageInterface[],
  name: string
}

const Messages:FC<Props> = ({ messages, name }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }
  }, [messages])
  
  return (
    <div className='m-chat-messages'>
      {messages.map((message, i) => <ChatMessage key={i} message={message} name={name}/>)}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages
