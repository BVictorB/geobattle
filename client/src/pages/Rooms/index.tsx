import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { TokenContext } from '@contexts'
import { RoomInterface } from '@interfaces'
import { fetchWithToken } from '@utils'

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<RoomInterface[]>()
  const { token } = useContext(TokenContext)

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetchWithToken({ endpoint: '/rooms', token })
      if (res.auth) {
        setRooms(res.data)
      }
    }

    fetchRooms()
  }, [token])

  return (
    <div style={{ color: 'white' }}>
      {rooms && rooms.map((room, index) => (
        <Link key={index} to={`/room/${room._id}`}>
          {room.name}
        </Link>
      ))}
      {!token && <Redirect to='/login' />}
    </div>
  )
}

export default Rooms
