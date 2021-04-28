import { FC, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { io, Socket } from 'socket.io-client'
import { Chat, Loader, Lobby, Map } from 'components'
import { TokenContext } from 'contexts'
import { fetchWithToken } from 'utils'
import { RoomInterface } from 'interfaces'
import './Room.scss'

let socket: Socket

const Room:FC = () => {
  const 
    [name, setName] = useState<string | null>(null),
    [room, setRoom] = useState<string>(),
    [gameState, setGameState] = useState<string>('lobby'),
    { id } = useParams<any>(),
    { token, setToken } = useContext(TokenContext)

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await fetchWithToken({ endpoint: `/api/getroom/${id}`, token })
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
    socket = io('/api/')
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
      if (data.finished) return setGameState('finished')
      if (data.started) {
        setGameState('playing')
      } else {
        setGameState('lobby')
      }
    })
  }, [])

  if (!socket) return <Loader />

  return (
    <main>
      {gameState === 'playing' ? 
        <Map socket={socket} />
      :
        <Lobby socket={socket} name={name} gameState={gameState} />
      }
      <div className='p-room'>
        <Chat socket={socket} name={name} />
      </div>
    </main>
  )
}

export default Room
