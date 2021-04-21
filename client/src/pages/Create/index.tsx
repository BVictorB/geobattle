import { FC, FormEvent, useState, useContext } from 'react'
import { Redirect } from 'react-router'
import { Input, Select, Radio } from '@components'
import { TokenContext } from '@contexts'

const Create:FC = () => {
  const [name, setName] = useState<string>()
  const [rounds, setRounds] = useState<string>('regular')
  const [time, setTime] = useState<string>('regular')
  const [continent, setContinent] = useState<string>('all')
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
          name,
          rounds,
          time,
          continent
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
        <Radio 
          label={'Length of game'}
          options={['short', 'regular', 'long']}
          state={rounds}
          onChange={(e) => setRounds(e)}
        />
        <Radio 
          label={'Length of rounds'}
          options={['short', 'regular', 'long']}
          state={time}
          onChange={(e) => setTime(e)}
        />
        <Select 
          label={'Continent'}
          onChange={(e) => setContinent(e)}
          options={
            [
              'All', 
              'Africa', 
              'Asia', 
              'Australia', 
              'Europe', 
              'North America', 
              'South America'
            ]
          }
        />
        <button className='wide-button' type='submit'>Create room</button>
      </form>
      {room && <Redirect to={`/room/${room}`}/> }
      {!token && <Redirect to='/login' />}
    </main>
  )
}

export default Create
