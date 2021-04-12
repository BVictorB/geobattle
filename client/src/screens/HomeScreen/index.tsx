import { FormEvent, useState } from 'react'
import { Redirect } from 'react-router'
import { Input } from '@components'
import './HomeScreen.scss'

const HomeScreen = () => {
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
        <Input 
          label={'Room name'}
          onChange={setName}
          autoFocus={true}
        />
        <Input 
          label={'Rounds'}
          type={'number'} 
          onChange={(e) => setRounds(Number(e))} 
        />
        <Input 
          label={'Time per round'} 
          type={'number'} 
          onChange={(e) => setTime(Number(e))} 
        />
        <button type='submit'>Create room</button>
      </form>
      {room && <Redirect to={`/room/${room}`}/> }
    </div>
  )
}

export default HomeScreen
