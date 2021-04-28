import { FC } from 'react'
import { Link } from 'react-router-dom'
import { RoomInterface } from 'interfaces'
import './RoomCard.scss'

interface Props {
  room: RoomInterface
}

const RoomCard:FC<Props> = ({ room }) => {
  return (
    <Link className='m-room-card' to={`/room/${room._id}`}>
      <h3 className='m-room-card__title'>{room.name}</h3>
      <p className='m-room-card__text'>{room.rounds} {room.rounds === 1 ? 'round' : 'rounds'}</p>
      <p className='m-room-card__text'>{room.time} seconds per round</p>
      <p>{room.users.length} {room.users.length === 1 ? 'user' : 'users'} in this room</p>
    </Link>
  )
}

export default RoomCard
