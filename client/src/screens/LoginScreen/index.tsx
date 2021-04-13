import { FormEvent, useState } from 'react'
import { Input } from '@components'

interface Auth {
  auth: boolean,
  token?: string,
  message?: string
}

const LoginScreen = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [token, setToken] = useState<any>(null)

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
    if (data.auth) {
      setToken(data.token)
    } else {
      setToken(null)
    }
  }

  const checkToken = () => {
    const authDetails = {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    }
    
    fetch('/auth', authDetails)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  return (
    <div className='home-container'>
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
        <button type='submit'>Login</button>
      </form>
      <button onClick={checkToken}>Test token</button>
    </div>
  )
}

export default LoginScreen
