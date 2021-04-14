import React, { FormEvent, useEffect, useState, useContext } from 'react'
import { useParams, Redirect } from 'react-router'
import { io, Socket } from 'socket.io-client'
import { Chat, Map, RoomInfo, Input } from '@components'
import { RoomInterface } from '@interfaces'
import { TokenContext } from '@contexts'
import './RoomScreen.scss'

let socket: Socket

const Room: React.FC = () => {
  const [name, setName] = useState<string>()
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
    if (name && room) {
      socket.emit('join', { name, room }, (error: string) => {
        if(error) {
          alert(error)
        }
      })
    }
  }, [name, room])

  const [nameInput, setNameInput] = useState<string>()

  const submitName = (e: FormEvent) => {
    e.preventDefault()
    setName(nameInput)
  }

  if (!name) {
    return (
      <div className='room-container'>
        <form onSubmit={submitName}>
          <Input 
            label={'Name'}
            onChange={setNameInput}
            autoFocus={true}
          />
          <button className='name-button' type='submit'>Join room</button>
        </form>
      </div>
    )
  }

  return (
    <div className='room-container'>
      {socket && name && playing && <Map socket={socket}/>}
      {name && <div className='outerContainer'>
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
