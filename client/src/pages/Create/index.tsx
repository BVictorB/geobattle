import { FC, FormEvent, useState, useContext } from 'react'
import { Redirect } from 'react-router'
import { Input, Select, Radio, Alert } from 'components'
import { TokenContext } from 'contexts'

const Create:FC = () => {
  const 
    [name, setName] = useState<string>(),
    [rounds, setRounds] = useState<string>('regular'),
    [time, setTime] = useState<string>('regular'),
    [continent, setContinent] = useState<string>('all'),
    [room, setRoom] = useState<string>(),
    [alert, setAlert] = useState<string | null>(null),
    { token } = useContext(TokenContext)

  const createRoom = (e: FormEvent) => {
    setAlert(null)
    e.preventDefault()

    if (!name || !rounds || !time || !continent) {
      setAlert('Please fill in all fields')
      return
    }

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
  
    fetch('/api/createroom', roomDetails)
      .then(res => res.json())
      .then(data => setRoom(data.id))
      .catch((err) => console.log(err))
  }

  return (
    <main>
      {alert && <Alert message={alert} type={'error'} />}
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
    </main>
  )
}

export default Create
