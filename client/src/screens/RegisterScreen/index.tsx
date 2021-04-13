import { FormEvent, useState } from 'react'
import { Input } from '@components'

const RegisterScreen = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [repeatedPassword, setRepeatedPassword] = useState<string>()

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
        .then(data => console.log(data))
        .catch((err) => console.log(err))
    } else {
      console.log('Please fill in all the fields')
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
    </div>
  )
}

export default RegisterScreen
