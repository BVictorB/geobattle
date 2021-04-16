import React, { useState, useEffect, useContext } from 'react'
import { TokenContext } from '@contexts'
import { RoomInterface } from '@interfaces'
import { fetchWithToken } from '@utils'
import { RoomCard } from '@components'
import './Rooms.scss'

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
    <main>
      <div className='rooms-container'>
        {rooms && rooms.map((room, index) => <RoomCard key={index} room={room} />)}
      </div>
    </main>
  )
}

export default Rooms
