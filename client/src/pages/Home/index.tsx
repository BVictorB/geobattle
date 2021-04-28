import { FC, useState, useContext, useEffect } from 'react'
import { TokenContext } from 'contexts'
import { RoomInterface } from 'interfaces'
import { fetchWithToken } from 'utils'
import { Leaderboards, RoomCard } from 'components'
import './Home.scss'
const { REACT_APP_API: api } = process.env

const Home:FC = () => {
  const 
    [openRooms, setOpenRooms] = useState<RoomInterface[]>(),
    { token, setToken } = useContext(TokenContext)

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetchWithToken({ endpoint: `${api}/rooms`, token })
      if (res.auth) {
        setOpenRooms(res.data.filter((room: RoomInterface) => !room.started))
      } else {
        window.localStorage.removeItem('token')
        setToken(null)
      }
    }

    token && fetchRooms()
  }, [token, setToken])

  return (
    <main>
      <div className='p-home'>
        <h2 className='p-home__title'>Open rooms</h2>
        {openRooms?.length ? 
          openRooms.map((room, index) => <RoomCard 
            key={index} 
            room={room} 
          />) 
        : 
          <p>There are no open games at the moment.</p>
        }
        <Leaderboards />
      </div>
    </main>
  )
}

export default Home
