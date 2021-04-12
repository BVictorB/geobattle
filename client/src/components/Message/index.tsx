import { MessageInterface } from '@interfaces'
import './Message.scss'

interface Props {
  message: MessageInterface,
  name: string
}

const Message = ({message: { user, text }, name}: Props) => {
    const ownMessage = user === name
    const admin = user === 'admin'

    if (admin) {
      return (
        <div className='message message__admin'>
          <div className='message__container'>
            <p>{text}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className={ownMessage ? 'message message__own' : 'message message__other'}>
          <div className='message__container'>
            {!ownMessage && <p className='message__user'>{user}</p>}
            <p>{text}</p>
          </div>
        </div>
      )
    }
}

export default Message
