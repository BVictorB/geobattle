import { FC, useState, useEffect, useContext } from 'react'
import { TokenContext } from '@contexts'
import { RoomInterface } from '@interfaces'
import { fetchWithToken } from '@utils'
import { Loader, RoomCard } from '@components'
import './Rooms.scss'

const Rooms:FC = () => {
  const 
    [rooms, setRooms] = useState<RoomInterface[]>(),  
    { token, setToken } = useContext(TokenContext)

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

  if (!rooms) return <Loader />

  return (
    <main className='p-rooms'>
      {rooms.map((room, index) => <RoomCard key={index} room={room} />)}
    </main>
  )
}

export default Rooms
