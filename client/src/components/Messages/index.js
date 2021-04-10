import ScrollToBottom from 'react-scroll-to-bottom'
import { Message } from '@components'
import './Messages.css';

const Messages = ({ messages, name }) => {
  console.log('Messages rendered')
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => <Message key={i} message={message} name={name}/>)}
    </ScrollToBottom>
  )
}

export default Messages
