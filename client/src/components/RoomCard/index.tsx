import React from 'react'
import { Link } from 'react-router-dom'
import { RoomInterface } from '@interfaces'
import './RoomCard.scss'

interface Props {
  room: RoomInterface
}

const RoomCard: React.FC<Props> = ({ room }) => {
  return (
    <Link className='room-card' to={`/room/${room._id}`}>
      <h3 className='room-card__title'>{room.name}</h3>
      <p className='room-card__text'>{room.rounds} rounds</p>
      <p className='room-card__text'>{room.time} seconds per round</p>
      <p>{room.users.length} users</p>
    </Link>
  )
}

export default RoomCard
