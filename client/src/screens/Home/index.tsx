import { FormEvent, useState } from 'react'
import { Redirect } from 'react-router'
import './Home.css'

const Join = () => {
  const [name, setName] = useState<string>()
  const [rounds, setRounds] = useState<number>()
  const [time, setTime] = useState<number>()
  const [room, setRoom] = useState<string>()

  const createRoom = (e: FormEvent) => {
    e.preventDefault()

    if (name && rounds && time) {
      const roomDetails = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          rounds: rounds,
          time: time
        })
      }
    
      fetch('/createroom', roomDetails)
        .then(res => res.json())
        .then(data => setRoom(data.id))
        .catch((err) => console.log(err))
    } else {
      console.log('Please fill in all the fields')
    }
  }

  return (
    <div className='home-container'>
      <form onSubmit={createRoom}>
        <label>
          Room name
          <input onChange={e => setName(e.target.value)} type='text' autoFocus/>
        </label>
        <label>
          Rounds
          <input onChange={e => setRounds(Number(e.target.value))} type='number'/>
        </label>
        <label>
          Time per round
          <input onChange={e => setTime(Number(e.target.value))} type='number'/>
        </label>
        <button type='submit'>Create room</button>
      </form>
      {room && <Redirect to={`/room/${room}`}/> }
    </div>
  )
}

export default Join
