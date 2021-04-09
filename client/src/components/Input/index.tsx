import { Dispatch, FormEvent } from 'react'
import './Input.css'

interface Props {
  message: string,
  setMessage: Dispatch<string>,
  sendMessage: (e: FormEvent) => void
}

const Input = ({ message, setMessage, sendMessage }: Props) => (
  <form onSubmit={sendMessage} className="form">
    <input 
      className="input" 
      type="text" 
      placeholder="Type a message..." 
      value={message} 
      onChange={(e) => setMessage(e.target.value)} 
    />
    <button className="sendButton" type="submit">Send</button>
  </form>
)

export default Input
