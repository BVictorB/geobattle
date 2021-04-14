import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
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
  }, [])

  return (
    <div style={{ color: 'white' }}>
      {rooms && rooms.map((room, index) => <p key={index}>{room.name}</p>)}
      {!token && <Redirect to='/login' />}
    </div>
  )
}

export default Rooms
