import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { io, Socket } from 'socket.io-client'
import { Chat, Map, RoomInfo, Input } from '@components'
import { RoomInterface } from '@interfaces'
import './RoomScreen.scss'

let socket: Socket

const Room = () => {
  const [name, setName] = useState<string>()
  const [room, setRoom] = useState<string>()
  const [playing, setPlaying] = useState<boolean>(true)
  const { id } = useParams<any>()

  useEffect(() => {
    fetch(`/getroom/${id}`)
      .then(res => res.json())
      .then(data => setRoom(data._id))
      .catch((err) => {
        console.info(err)
      })
  }, [])

  useEffect(() => {
    socket = io('/')
  }, [])

  useEffect(() => {
    socket.on('roomData', (data: RoomInterface) => {
      if (data.round === data.rounds) {
        setPlaying(false)
      }
    })
  }, [socket])

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
        </div>
      </div>}
    </div>
  )

}

export default Room
