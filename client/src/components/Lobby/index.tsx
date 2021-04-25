import { FC, useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { RoomInterface } from '@interfaces'
import { Loader } from '@components'
import './Lobby.scss'

interface Props {
  socket: Socket,
  name: string | null
}

const Lobby:FC<Props> = ({ socket, name }) => {
  const [roomData, setRoomData] = useState<RoomInterface>()

  useEffect(() => {
    socket.on('roomData', (data: RoomInterface) => {
      setRoomData(data)
    })
  }, [socket])

  if (!roomData) return <Loader />

  return (
    <div className='m-lobby'>
      <h2>Lobby</h2>
      <p>The match will start once all users are ready.</p>
      <p>Users:</p>
      {roomData.users.map((user, index) => (
        <div key={index}>
          <p>{user.username}: {user.ready ? 'Ready' : 'Not ready'}</p>
          {(name === user.username && !user.ready) && <button onClick={() => socket.emit('ready')}>Ready</button>}
        </div>
      ))}
    </div>
  )
}

export default Lobby
