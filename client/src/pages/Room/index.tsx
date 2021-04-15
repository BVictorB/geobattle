import React, { FormEvent, useEffect, useState, useContext } from 'react'
import { useParams, Redirect } from 'react-router'
import { io, Socket } from 'socket.io-client'
import { Chat, Map, RoomInfo, Input } from '@components'
import { RoomInterface } from '@interfaces'
import { TokenContext } from '@contexts'
import './RoomScreen.scss'

let socket: Socket

const Room: React.FC = () => {
  const [name, setName] = useState<string>('temp')
  const [room, setRoom] = useState<string>()
  const [playing, setPlaying] = useState<boolean>(true)
  const { id } = useParams<any>()
  const { token } = useContext(TokenContext)

  useEffect(() => {
    fetch(`/getroom/${id}`)
      .then(res => res.ok && res.json())
      .then(data => setRoom(data._id))
      .catch((err) => {
        console.error(`Error: ${err}`)
      })
  }, [id])

  useEffect(() => {
    socket = io('/')
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
    <div className='room-container'>
      {socket && playing && <Map socket={socket}/>}
      {<div className='outerContainer'>
        <div className='container'>
          {socket && <RoomInfo socket={socket} />}
          {socket && <Chat socket={socket} name={name} />}
          {!token && <Redirect to='/login' />}
        </div>
      </div>}
    </div>
  )

}

export default Room
