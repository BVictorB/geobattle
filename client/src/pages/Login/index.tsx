import React, { FormEvent, useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Input } from '@components'
import { TokenContext } from '@contexts'

interface Auth {
  auth: boolean,
  token?: string,
  message?: string
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const { token, setToken } = useContext(TokenContext)

  const login = (e: FormEvent) => {
    e.preventDefault()

    if (email && password) {
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
    
      fetch('/login', loginDetails)
        .then(res => res.json())
        .then(data => handleLogin(data))
        .catch(err => console.log(err))
    } else {
      console.log('Please fill in all the fields')
    }
  }

  const handleLogin = (data: Auth) => {
    if (data.auth && data.token) {
      setToken(data.token)
      window.localStorage.setItem('token', data.token)
    } else {
      setToken(null)
    }
  }

  return (
    <main>
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
        <Link to='/register'>
          <button className='wide-button'>Register</button>
        </Link>
      </form>
      {token && <Redirect to='/' />}
    </main>
  )
}

export default Login
