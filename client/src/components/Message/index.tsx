import './Message.css'

interface Props {
  message: {
    user: string,
    text: string
  },
  name: string
}

const Message = ({message: { user, text }, name}: Props) => {
    const ownMessage = user === name
    const admin = user === 'admin'

    if (admin) {
      return (
        <div className='message-admin'>
          <div className="message-container">
            <p>{text}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className={ownMessage ? 'message-own' : 'message-other'}>
          <div className="message-container">
            {!ownMessage && <p className='user'>{user}</p>}
            <p>{text}</p>
          </div>
        </div>
      )
    }
}

export default Message
