import { FC, FormEvent, useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Alert, Input } from 'components'
import { TokenContext } from 'contexts'
import { AuthInterface } from 'interfaces'

const Login:FC = () => {
  const 
    [email, setEmail] = useState<string>(),
    [password, setPassword] = useState<string>(),
    [alert, setAlert] = useState<string | null>(null),
    { token, setToken } = useContext(TokenContext)

  const login = (e: FormEvent) => {
    setAlert(null)
    e.preventDefault()

    const loginDetails = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
  
    fetch('/api/login', loginDetails)
      .then(res => res.json())
      .then(data => handleLogin(data))
      .catch(err => console.log(err))
  }

  const handleLogin = (data: AuthInterface) => {
    if (data.auth && data.token) {
      setToken(data.token)
      window.localStorage.setItem('token', data.token)
      return
    }
    data.message && setAlert(data.message)
    setToken(null)
  }

  return (
    <main>
      {alert && <Alert message={alert} type={'error'} />}
      <form onSubmit={login}>
        <Input 
          label={'Email adress'}
          onChange={setEmail}
          autoFocus={true}
        />
        <Input 
          label={'Password'}
          type={'password'}
          onChange={setPassword}
        />
        <button className='wide-button' type='submit'>Login</button>
      </form>
      {token && <Redirect to='/' />}
    </main>
  )
}

export default Login
