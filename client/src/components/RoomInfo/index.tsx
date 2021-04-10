import { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { RoomData } from '@interfaces'

interface Props {
  socket: Socket
}

const RoomInfo = ({ socket }: Props) => {
  const [roomData, setRoomData] = useState<RoomData>()

  useEffect(() => {
    socket.on('roomData', (data: RoomData) => {
      console.log(data)
      setRoomData(data)
    })
  })

  return (
    <div>
      <h2>{roomData && roomData.name}</h2>
      {roomData && roomData.users.map(user => <p className='scoreboard' key={user.id}>{user.username}: {user.points}</p>)}    
    </div>
  )
}

export default RoomInfo
