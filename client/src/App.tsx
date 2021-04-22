import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Admin, Home, Room, Rooms, Register, Login, Create } from '@pages'
import { Navigation, Loader } from '@components'
import { TokenContext } from '@contexts'
import { fetchWithToken } from '@utils'

const App = () => {
  const [token, setToken] = useState<string | null>(null)
  const [authenticating, setAuthenticating] = useState<boolean>(true)
  const tokenValue = useMemo(() => ({ token, setToken }), [token, setToken])

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = window.localStorage.getItem('token')
      storedToken && !token && setToken(storedToken)
      if (!token) {
        setAuthenticating(false)
        return
      }
      const res = await fetchWithToken({ endpoint: '/auth', token })
      if (res.auth === false) setToken(null)
      setAuthenticating(false)
    }
    fetchToken()
  }, [token])

  if (authenticating) {
    return <Loader />
  }

  return (
    <Router>
      <TokenContext.Provider value={tokenValue}>
        <Navigation />
        <Route path='/' exact component={Home} />
        <Route path='/admin/' component={Admin} />
        <Route path='/create/' component={Create} />
        <Route path='/room/:id' component={Room} />
        <Route path='/login/' component={Login} />
        <Route path='/register/' component={Register} />
        <Route path='/rooms/' component={Rooms} />
        {!token && <Redirect to='/login' />}
      </TokenContext.Provider>
    </Router>
  )
}

export default App
