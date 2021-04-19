import { FC, useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { RoomInterface } from '@interfaces'
import './RoomInfo.scss'

interface Props {
  socket: Socket
}

const RoomInfo:FC<Props> = ({ socket }) => {
  const [roomData, setRoomData] = useState<RoomInterface>()

  useEffect(() => {
    socket.on('roomData', (data: RoomInterface) => {
      setRoomData(data)
    })
  }, [socket])

  return (
    <div className='m-room-info'>
      <h2>{roomData && roomData.name}</h2>
      {roomData && roomData.users.sort((a, b) => b.points - a.points).map((user, index) => (
        <p className='scoreboard' key={index}>{index + 1}. {user.username}: {user.points}</p>
      ))}
    </div>
  )
}

export default RoomInfo
