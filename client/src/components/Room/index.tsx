import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { io, Socket } from 'socket.io-client'
import { Chat, Map } from '@components'

let socket: Socket

const Room = ({ location }: any) => {
  const [coords, setCoords] = useState<[number, number]>([0,0])
  const [name, setName] = useState<string>('')
  const [room, setRoom] = useState<string>('')

  useEffect(() => {
    const { name, room }: any = queryString.parse(location.search)
    socket = io('/')
    setRoom(room)
    setName(name)
    socket.emit('join', { name, room }, (error: string) => {
      if(error) {
        alert(error)
      }
    })
  }, [location.search])

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
