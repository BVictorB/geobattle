import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { io, Socket } from 'socket.io-client'
import { Chat, Map, RoomInfo, NameInput } from '@components'
import './Room.css'

let socket: Socket

const Room = () => {
  const [name, setName] = useState<string>()
  const [room, setRoom] = useState<string>()
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

  return (
    <div className='room-container'>
      {!name && <NameInput submitName={submitName} setNameInput={setNameInput} />}
      {socket && name && <Map socket={socket}/>}
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
