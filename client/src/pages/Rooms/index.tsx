import { FC, useState, useEffect, useContext } from 'react'
import { TokenContext } from 'contexts'
import { RoomInterface } from 'interfaces'
import { fetchWithToken } from 'utils'
import { Loader, RoomCard } from 'components'
import './Rooms.scss'
const { REACT_APP_API: api } = process.env

const Rooms:FC = () => {
  const 
    [openRooms, setOpenRooms] = useState<RoomInterface[]>(),
    [playingRooms, setPlayingRooms] = useState<RoomInterface[]>(),
    { token, setToken } = useContext(TokenContext)

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetchWithToken({ endpoint: `${api}/rooms`, token })
      if (res.auth) {
        setOpenRooms(res.data.filter((room: RoomInterface) => !room.started))
        setPlayingRooms(res.data.filter((room: RoomInterface) => room.started && !room.finished))
      } else {
        window.localStorage.removeItem('token')
        setToken(null)
      }
    }

    token && fetchRooms()
  }, [token, setToken])

  if (!openRooms && !playingRooms) return <Loader />

  return (
    <main>
      <div className='p-rooms'>
        <h2 className='p-rooms__title'>Open</h2>
        {openRooms?.length ? 
          openRooms.map((room, index) => <RoomCard 
            key={index} 
            room={room} 
          />) 
        : 
          <p>There are no open games at the moment.</p>
        }
        <h2 className='p-rooms__title'>In progress</h2>
        {playingRooms?.length ? 
          playingRooms.map((room, index) => <RoomCard 
            key={index} 
            room={room} 
            playing={true} 
          />) 
        : 
          <p>There are no games in progress at the moment.</p>
        }
      </div>
    </main>
  )
}

export default Rooms
