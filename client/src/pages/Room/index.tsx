import { FC, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { io, Socket } from 'socket.io-client'
import { Chat, Loader, Lobby, Map } from 'components'
import { TokenContext } from 'contexts'
import { fetchWithToken } from 'utils'
import { RoomInterface } from 'interfaces'
import './Room.scss'
const { REACT_APP_API: api } = process.env

let socket: Socket

const Room:FC = () => {
  const 
    [name, setName] = useState<string | null>(null),
    [room, setRoom] = useState<string>(),
    [finished, setFinished] = useState<boolean>(false),
    [playing, setPlaying] = useState<boolean>(false),
    [roomData, setRoomData] = useState<RoomInterface | null>(null),
    { id } = useParams<any>(),
    { token, setToken } = useContext(TokenContext)

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await fetchWithToken({ endpoint: `${api}/getroom/${id}`, token })
      if (res.auth) {
        setRoom(res.room._id)
      } else {
        window.localStorage.removeItem('token')
        setToken(null)
      }
    }

    fetchRoom()
  }, [token, setToken, id])

  useEffect(() => {
    socket = io(`${api}/`)
    return () => { socket.disconnect() }
  }, [])

  useEffect(() => {
    if (token && room) {
      socket.emit('join', { token, room }, 
      (name: string) => setName(name))
    }
  }, [token, room])

  useEffect(() => {
    socket.on('roomData', (data: RoomInterface) => {
      setRoomData(data)
      if (data.finished) {
        setFinished(true)
        setPlaying(false)
        return
      }
      data.started && setPlaying(true)
    })
  }, [])

  if (!socket) return <Loader />

  return (
    <main>
      {playing && <Map socket={socket} />}
      {!playing && <Lobby socket={socket} name={name} finished={finished} roomData={roomData} />}
      <div className='p-room'>
        <Chat socket={socket} name={name} />
      </div>
    </main>
  )
}

export default Room
