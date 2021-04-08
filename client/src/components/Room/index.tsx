import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import queryString from 'query-string'
import { io, Socket } from 'socket.io-client'
import { Chat, Map } from '@components'

let socket: Socket

const Room = () => {
  const [coords, setCoords] = useState<[number, number]>([0,0])
  const [name, setName] = useState<string>(`${Math.random()}`)
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

  return (
    <>
      {coords && <Map position={coords}/>}
      {socket && name && <Chat socket={socket} name={name} />}
    </>
  )
}

export default Room
