import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { TokenContext } from '@contexts'
import { RoomInterface } from '@interfaces'
import { fetchWithToken } from '@utils'

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<RoomInterface[]>()
  const { token, setToken } = useContext(TokenContext)

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetchWithToken({ endpoint: '/rooms', token })
      if (res.auth) {
        setRooms(res.data)
      } else {
        window.localStorage.removeItem('token')
        setToken(null)
      }
    }

    token && fetchRooms()
  }, [token, setToken])

  return (
    <div style={{ color: 'white', paddingTop: '4em' }}>
      {rooms && rooms.map((room, index) => (
        <Link key={index} to={`/room/${room._id}`}>
          {room.name}
        </Link>
      ))}
    </div>
  )
}

export default Rooms
