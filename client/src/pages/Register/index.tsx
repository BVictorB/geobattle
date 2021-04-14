import React, { FormEvent, useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Input } from '@components'
import { TokenContext } from '@contexts'

interface Auth {
  auth: boolean,
  token?: string,
  message?: string
}

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [repeatedPassword, setRepeatedPassword] = useState<string>()
  const { token, setToken } = useContext(TokenContext)

  const register = (e: FormEvent) => {
    e.preventDefault()

    if (email && password === repeatedPassword) {
      const registerDetails = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    
      fetch('/register', registerDetails)
        .then(res => res.json())
        .then(data => handleLogin(data))
        .catch((err) => console.log(err))
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

  return (
    <div className='home-container'>
      <form onSubmit={register}>
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
        <Input 
          label={'Repeat password'}
          type={'password'}
          onChange={setRepeatedPassword}
        />
        <button type='submit'>Register</button>
      </form>
      {token && <Redirect to='/' />}
    </div>
  )
}

export default Register
