import { FC } from 'react'
import { Link } from 'react-router-dom'
import { RoomInterface } from 'interfaces'
import './RoomCard.scss'

interface Props {
  room: RoomInterface,
  playing?: boolean
}

const RoomCard:FC<Props> = ({ room, playing }) => {
  if (playing) {
    return (
      <div className='m-room-card'>
        <h3 className='m-room-card__title'>{room.name}</h3>
        <p className='m-room-card__text'>Round {room.round}/{room.rounds}</p>
        <p className='m-room-card__text'>{room.time} seconds per round</p>
        <p>{room.users.length} {room.users.length === 1 ? 'user' : 'users'} in this room</p>
      </div>
    )
  } else {
    return (
      <Link className='m-room-card m-room-card--link' to={`/room/${room._id}`}>
        <h3 className='m-room-card__title'>{room.name}</h3>
        <p className='m-room-card__text'>{room.rounds} {room.rounds === 1 ? 'round' : 'rounds'}</p>
        <p className='m-room-card__text'>{room.time} seconds per round</p>
        <p>{room.users.length} {room.users.length === 1 ? 'user' : 'users'} in this room</p>
      </Link>
    )
  }
}

export default RoomCard
