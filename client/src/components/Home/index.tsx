import { useState } from 'react'
import { Redirect } from 'react-router'
import './Home.css'

const Join = () => {
  const [room, setRoom] = useState(null)

  const createRoom = () => {
    const roomDetails = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Testroom',
        rounds: 10,
        time: 60
      })
    }
  
    fetch('/createroom', roomDetails)
      .then(res => res.json())
      .then(data => setRoom(data.id))
      .catch((err) => console.log(err))
  }

  return (
    <div className="joinOuterContainer">
      <button onClick={() => createRoom()}>Create a lobby</button>
      {room && <Redirect to={`/room/${room}`}/> }
    </div>
  )
}

export default Join
