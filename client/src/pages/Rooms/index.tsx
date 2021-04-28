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
    [finishedRooms, setFinishedRooms] = useState<RoomInterface[]>(),
    { token, setToken } = useContext(TokenContext)

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetchWithToken({ endpoint: `${api}/rooms`, token })
      if (res.auth) {
        setOpenRooms(res.data.filter((room: RoomInterface) => !room.started))
        setPlayingRooms(res.data.filter((room: RoomInterface) => room.started && !room.finished))
        setFinishedRooms(res.data.filter((room: RoomInterface) => room.finished))
      } else {
        window.localStorage.removeItem('token')
        setToken(null)
      }
    }

    token && fetchRooms()
  }, [token, setToken])

  if (!openRooms && !playingRooms && !finishedRooms) return <Loader />

  return (
    <main>
      <div className='p-rooms'>
        {openRooms?.length && <h2>Open</h2>}
        {openRooms && openRooms.map((room, index) => <RoomCard key={index} room={room} />)}
        {playingRooms?.length && <h2>Playing</h2>}
        {playingRooms && playingRooms.map((room, index) => <RoomCard key={index} room={room} />)}
        {finishedRooms?.length && <h2>Finished</h2>}
        {finishedRooms && finishedRooms.map((room, index) => <RoomCard key={index} room={room} />)}
      </div>
    </main>
  )
}

export default Rooms
