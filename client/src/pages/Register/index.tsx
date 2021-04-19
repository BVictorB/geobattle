import { FC, FormEvent, useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Input } from '@components'
import { TokenContext } from '@contexts'
import { AuthInterface } from '@interfaces'

const Register:FC = () => {
  const [email, setEmail] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [repeatedPassword, setRepeatedPassword] = useState<string>()
  const { token, setToken } = useContext(TokenContext)

  const register = (e: FormEvent) => {
    e.preventDefault()

    if (email && username && password === repeatedPassword) {
      const registerDetails = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password
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

  const handleLogin = (data: AuthInterface) => {
    if (data.auth) {
      setToken(data.token)
    } else {
      setToken(null)
    }
  }

  return (
    <main>
      <form onSubmit={register}>
        <Input 
          label={'Email adress'}
          onChange={setEmail}
          autoFocus={true}
        />
        <Input 
          label={'Username'}
          onChange={setUsername}
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
        <button className='wide-button' type='submit'>Register</button>
      </form>
      {token && <Redirect to='/' />}
    </main>
  )
}

export default Register
