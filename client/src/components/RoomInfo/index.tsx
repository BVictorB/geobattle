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
    if (!roomData?.timeleft) return
    const interval = setInterval(() => {
      const now = new Date().getTime() / 1000
      const difference = roomData.timeleft - now
      setTimeLeft(roundNum(difference, 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [roomData])

  if (!roomData) return <Loader />

  return (
    <div className='m-room-info'>
      <div className='m-room-info__container'>
        <h2 className='m-room-info__name'>{roomData.name}</h2>
        <h2 className='m-room-info__round'>{roomData.round + 1}/{roomData.rounds}</h2>
      </div>
      <div className='m-room-info__container'>
        <div>
          <h3>Scoreboard:</h3>
          {roomData.users.sort((a, b) => b.points - a.points).map((user, index) => (
            <p className='scoreboard' key={index}>{index + 1}. {user.username}: {user.points}</p>
          ))}
        </div>
        <h3>Time left: {timeLeft}</h3>
      </div>
    </div>
  )
}

export default RoomInfo
