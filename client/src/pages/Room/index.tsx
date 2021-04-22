import { FC, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { io, Socket } from 'socket.io-client'
import { Chat, Map } from '@components'
import { RoomInterface } from '@interfaces'
import { TokenContext } from '@contexts'
import { fetchWithToken } from '@utils'
import './Room.scss'

let socket: Socket

const Room:FC = () => {
  const [name, setName] = useState<string>('temp')
  const [room, setRoom] = useState<string>()
  const [playing, setPlaying] = useState<boolean>(true)
  const { id } = useParams<any>()
  const { token, setToken } = useContext(TokenContext)

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
    
    return function cleanup () {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on('roomData', (data: RoomInterface) => {
      if (data.round === data.rounds) {
        setPlaying(false)
      }
    })
  }, [])

  useEffect(() => {
    if (token && room) {
      socket.emit('join', { token, room }, 
      (name: string) => setName(name))
    }
  }, [token, room])

  return (
    <main>
      {socket && playing && <Map socket={socket}/>}
      {<div className='p-room'>
        {socket && <Chat socket={socket} name={name} />}
      </div>}
    </main>
  )

}

export default Room
