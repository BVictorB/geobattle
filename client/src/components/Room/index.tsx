import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { io, Socket } from 'socket.io-client'
import { Chat, Map } from '@components'
import { roundNum } from '@utils'

let socket: Socket

const Room = () => {
  const [coords, setCoords] = useState<[number, number]>([0,0])
  const [name, setName] = useState<string>()
  // const [name, setName] = useState<string>(`${roundNum(Math.random() * 100, 2)}`)
  const [room, setRoom] = useState<string>()

  const { id } = useParams<any>()
  const [lobbyData, setLobbyData] = useState<{ rounds: number, time: number }>()

  useEffect(() => {
    fetch(`/getroom/${id}`)
      .then(res => res.json())
      .then(data => setRoom(data._id))
      .catch((err) => {
        console.info(err);
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

  useEffect(() => {
    socket.on('coords', ({ coords }: { coords: [number, number] }) => {
      setCoords(coords)
    })
  }, [])

  const [nameInput, setNameInput] = useState<string>()

  const submitName = (e: FormEvent) => {
    e.preventDefault()
    setName(nameInput)
  }

  return (
    <>
      {!name && <form onSubmit={submitName}>
          <label>
            Name
            <input onChange={e => setNameInput(e.target.value)} type='text'/>
            <button type='submit'>Submit</button>
          </label>
        </form>}
      {coords && name && <Map position={coords}/>}
      {socket && name && <Chat socket={socket} name={name} />}
    </>
  )
}

export default Room
