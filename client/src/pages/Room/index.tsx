import { FC, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { io, Socket } from 'socket.io-client'
import { Chat, Loader, Lobby, Map } from '@components'
import { TokenContext } from '@contexts'
import { fetchWithToken } from '@utils'
import { RoomInterface } from '@interfaces'
import './Room.scss'

let socket: Socket

const Room:FC = () => {
  const 
    [name, setName] = useState<string | null>(null),
    [room, setRoom] = useState<string>(),
    [started, setStarted] = useState<boolean>(false),
    { id } = useParams<any>(),
    { token, setToken } = useContext(TokenContext)

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await fetchWithToken({ endpoint: `/getroom/${id}`, token })
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
    socket = io('/')
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
      if (data.started) {
        setStarted(true)
      } else {
        setStarted(false)
      }
    })
  }, [])

  if (!socket) return <Loader />

  return (
    <main>
      {started ? 
        <Map socket={socket} />
      :
        <Lobby socket={socket} name={name} />
      }
      <div className='p-room'>
        <Chat socket={socket} name={name} />
      </div>
    </main>
  )
}

export default Room
