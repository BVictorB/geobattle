import { Dispatch, FormEvent } from 'react'
import './ChatInput.scss'

interface Props {
  message: string,
  setMessage: Dispatch<string>,
  sendMessage: (e: FormEvent) => void
}

const ChatInput = ({ message, setMessage, sendMessage }: Props) => (
  <form onSubmit={sendMessage} className='chat-input'>
    <input 
      type="text" 
      placeholder="Type a message..." 
      value={message} 
      onChange={(e) => setMessage(e.target.value)} 
      autoFocus
    />
    <button type="submit">Send</button>
  </form>
)

export default ChatInput