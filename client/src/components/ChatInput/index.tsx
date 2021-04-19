import { FC, Dispatch, FormEvent } from 'react'
import { Send } from '@icons'
import './ChatInput.scss'

interface Props {
  message: string,
  setMessage: Dispatch<string>,
  sendMessage: (e: FormEvent) => void
}

const ChatInput:FC<Props> = ({ message, setMessage, sendMessage }) => (
  <form onSubmit={sendMessage} className='m-chat-input'>
    <input 
      type="text" 
      placeholder="Type a message..." 
      value={message} 
      onChange={(e) => setMessage(e.target.value)} 
      autoFocus
    />
    <button type="submit">
      <Send color={'#1A1A1D'} />
    </button>
  </form>
)

export default ChatInput
