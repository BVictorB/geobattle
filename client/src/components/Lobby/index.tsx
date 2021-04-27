import { FC, useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { RoomInterface } from '@interfaces'
import { Loader } from '@components'
import { Success, Error } from '@icons'
import './Lobby.scss'

interface Props {
  socket: Socket,
  name: string | null,
  gameState: string
}

const Lobby:FC<Props> = ({ socket, name, gameState }) => {
  const [roomData, setRoomData] = useState<RoomInterface>()

  useEffect(() => {
    socket.on('roomData', (data: RoomInterface) => {
      setRoomData(data)
    })
  }, [socket])

  if (!roomData) return <Loader />

  if (gameState === 'finished') {
    const winner = roomData.users.sort((a, b) => b.points - a.points)[0]
    return (
      <div className='m-lobby'>
      <h2>Lobby</h2>
      <p>{winner.username} has won with {winner.points} points!</p>
      <h3>Scoreboard:</h3>
      {roomData.users.sort((a, b) => b.points - a.points).map((user, index) => (
        <p key={index}>{index + 1}. {user.username}: {user.points}</p>
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
