import { Dispatch, FormEvent } from 'react'
import './index.css'

interface Props {
  inputValue: string,
  setInputValue: Dispatch<string>,
  onSubmit: (e: FormEvent) => void
}

const Chat = ({ inputValue, setInputValue, onSubmit }: Props) => {
  return (
    <div className='sidebar'>
      <form onSubmit={onSubmit}>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Chat
