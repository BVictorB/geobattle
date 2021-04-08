import './Message.css'

interface Props {
  message: {
    user: string,
    text: string
  },
  name: string
}

const Message = ({message: { user, text }, name}: Props) => {
    let isSentByCurrentUser = false
    
    const trimmedName = name.trim().toLowerCase()

    if (user === trimmedName) {
        isSentByCurrentUser = true
    }

    return (
    isSentByCurrentUser
    ? (
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{trimmedName}</p>
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
