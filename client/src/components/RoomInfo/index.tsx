import React, { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { RoomInterface } from '@interfaces'
import './RoomInfo.scss'

interface Props {
  socket: Socket
}

const RoomInfo: React.FC<Props> = ({ socket }) => {
  const [roomData, setRoomData] = useState<RoomInterface>()

  useEffect(() => {
    socket.on('roomData', (data: RoomInterface) => {
      setRoomData(data)
    })
  }, [socket])

  return (
    <div className='roominfo-container'>
      <h2>{roomData && roomData.name}</h2>
      {roomData && roomData.users.sort((a, b) => b.points - a.points).map((user, i) => <p className='scoreboard' key={user.id}>{i + 1}: {user.username}: {user.points}</p>)}    
    </div>
  )
}

export default RoomInfo
