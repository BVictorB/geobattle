import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { RoomInterface } from 'interfaces'
import { Loader } from 'components'
import { Success, Error } from 'assets/icons'
import './Lobby.scss'

interface Props {
  socket: Socket,
  name: string | null,
  finished: boolean,
  roomData: RoomInterface | null
}

const Lobby:FC<Props> = ({ socket, name, finished, roomData }) => {
  if (!roomData) return <Loader />
  
  if (finished && roomData.winner) {
    return (
      <div className='m-lobby'>
        <h2 className='m-lobby__title'>Lobby</h2>
        <p>The game has finished.</p>
        <p>{roomData.winner}</p>
        <Link to='/create'>
          <button className='wide-button'>Click here to create a new room</button>
        </Link>
        <h3 className='m-lobby__title--small'>Scoreboard:</h3>
        {roomData.users.sort((a, b) => b.points - a.points).map((user, index) => (
          <p className='m-lobby__list' key={index}>{index + 1}. {user.username}: {user.points}</p>
        ))}
      </div>
    )
  }

  return (
    <div className='m-lobby'>
      <h2 className='m-lobby__title'>Lobby</h2>
      <p>The match will start once all users are ready.</p>
      <p>Users:</p>
      {roomData.users.map((user, index) => (
        <div className='m-lobby__user' key={index}>
          {user.ready ? <Success color='#009723' /> : <Error color='#cc0000' />}
          <p className='m-lobby__user__name'>{user.username}</p>
          {(name === user.username && !user.ready) && <button className='m-lobby__button' onClick={() => socket.emit('ready')}>Ready</button>}
        </div>
      ))}
    </div>
  )
}

export default Lobby
