import React, { FormEvent, useState, useContext } from 'react'
import { Redirect } from 'react-router'
import { Input } from '@components'
import { TokenContext } from '@contexts'

const Create: React.FC = () => {
  const [name, setName] = useState<string>()
  const [rounds, setRounds] = useState<number>()
  const [time, setTime] = useState<number>()
  const [room, setRoom] = useState<string>()
  const { token } = useContext(TokenContext)

  const createRoom = (e: FormEvent) => {
    e.preventDefault()

    if (name && rounds && time) {
      const roomDetails = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
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
    <main>
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
        <button className='wide-button' type='submit'>Create room</button>
      </form>
      {room && <Redirect to={`/room/${room}`}/> }
      {!token && <Redirect to='/login' />}
    </main>
  )
}

export default Create
