import { useMemo, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Home, Room, Register, Login } from '@pages'
import { TokenContext } from './TokenContext'

const App = () => {
  const [token, setToken] = useState<string | null>(null)
  const tokenValue = useMemo(() => ({ token, setToken }), [token, setToken])

  return (
    <Router>
      <nav>
        <ul>
          {token ?
            <>
              <li>
                <Link to='/rooms'>Rooms</Link>
              </li>
              <li>
                <Link to='/create'>Create Room</Link>
              </li>
            </> 
          :
            <>
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </>
          }
          <Link to='/about'>About</Link>
        </ul>
      </nav>
      <TokenContext.Provider value={tokenValue}>
        <Route path='/login/' component={Login} />
        <Route path='/register/' component={Register} />
      </TokenContext.Provider>
      <Route path='/' exact component={Home} />
      <Route path='/room/:id' component={Room} />
    </Router>
  )
}

export default App
