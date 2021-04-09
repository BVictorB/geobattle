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

    return (
      ownMessage
        ? (
            <div className="messageContainer justifyEnd">
              <p className="sentText pr-10">{user}</p>
              <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{text}</p>
              </div>
            </div>
        )
        : (
            <div className={user === 'admin' ? 'messageContainer admin' : 'messageContainer justifyStart'}>
              {user !== 'admin' && <p className="sentText pl-10">{user}</p>}
              <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{text}</p>
              </div>
            </div>
        ) 
    )
}

export default Message
