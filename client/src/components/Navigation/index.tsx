import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TokenContext } from '@contexts'
import './Navigation.scss'

const Navigation: React.FC = () => {
  const { token, setToken } = useContext(TokenContext)

  return (
    <nav>
      {token ?
        <>
          <Link to='/'>Home</Link>
          <Link to='/rooms'>Rooms</Link>
          <Link to='/create'>Create Room</Link>
          <button onClick={() => setToken(null)}>Log out</button>
        </> 
      :
        <>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </>
      }
      <Link to='/about'>About</Link>
    </nav>
  )
}

export default Navigation
