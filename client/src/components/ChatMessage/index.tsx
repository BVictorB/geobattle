import { FC } from 'react'
import { MessageInterface } from 'interfaces'
import './ChatMessage.scss'

interface Props {
  message: MessageInterface,
  name: string
}

const Message:FC<Props> = ({message: { user, text }, name}) => {
    const ownMessage = user === name
    const admin = user === 'admin'

    if (admin) {
      return (
        <div className='m-chat-message m-chat-message__admin'>
          <div className='m-chat-message__container'>
            <p>{text}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className={ownMessage ? 'm-chat-message m-chat-message__own' : 'm-chat-message m-chat-message__other'}>
          <div className='m-chat-message__container'>
            {!ownMessage && <p className='m-chat-message__user'>{user}</p>}
            <p>{text}</p>
          </div>
        </div>
      )
    }
}

export default Message
