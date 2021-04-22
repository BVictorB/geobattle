import { FC, useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { roundNum } from '@utils'
import { Loader } from '@components'
import { RoomInterface } from '@interfaces'
import './RoomInfo.scss'

interface Props {
  socket: Socket
}

const RoomInfo:FC<Props> = ({ socket }) => {
  const [roomData, setRoomData] = useState<RoomInterface>()
  const [timeLeft, setTimeLeft] = useState<number>()

  useEffect(() => {
    socket.on('roomData', (data: RoomInterface) => {
      setRoomData(data)
    })
  }, [socket])

  useEffect(() => {
    if (!roomData || !roomData.timeleft) return
    setInterval(() => {
      const now = new Date().getTime() / 1000
      const difference = roomData.timeleft - now
      if (difference < 0) return
      setTimeLeft(roundNum(difference, 0))
    }, 1000)
  }, [roomData])

  if (!roomData) return <Loader />

  return (
    <div className='m-room-info'>
      <h2>{roomData.name}</h2>
      <h3>Round: {roomData.round + 1}</h3>
      <h3>Time left: {timeLeft}</h3>
      {roomData.users.sort((a, b) => b.points - a.points).map((user, index) => (
        <p className='scoreboard' key={index}>{index + 1}. {user.username}: {user.points}</p>
      ))}
    </div>
  )
}

export default RoomInfo
