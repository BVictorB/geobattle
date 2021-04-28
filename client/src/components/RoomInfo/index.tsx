import { FC, useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { roundNum } from 'utils'
import { Loader } from 'components'
import { RoomInterface } from 'interfaces'
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
    if (!roomData) return
    if (!roomData.timeleft || !roomData.started || roomData.finished) return
    const interval = setInterval(() => {
      const now = new Date().getTime() / 1000
      const difference = roomData.timeleft - now
      setTimeLeft(roundNum(difference, 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [roomData])

  if (!roomData) return <Loader />

  if (!roomData.started || roomData.finished) {
    return (
      <div className='m-room-info'>
        <div className='m-room-info__container'>
          <h2 className='m-room-info__name'>{roomData.name}</h2>
        </div>
      </div>
    )
  }

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
            <p key={index}>{index + 1}. {user.username}: {user.points}</p>
          ))}
        </div>
        <h3 className={timeLeft && timeLeft <= 10 ? 'm-room-info__time m-room-info__time--red' : ''}>
          Time left: <span>{timeLeft}</span>
        </h3>
      </div>
    </div>
  )
}

export default RoomInfo
