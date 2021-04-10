import { Dispatch, FormEvent } from 'react'

interface Props {
  submitName: (e: FormEvent) => void,
  setNameInput: Dispatch<string>
}

const NameInput = ({ submitName, setNameInput }: Props) => {
  return (
    <form onSubmit={submitName}>
      <label>
        Name
        <input onChange={e => setNameInput(e.target.value)} type='text' autoFocus/>
        <button type='submit'>Join room</button>
      </label>
    </form>
  )
}

export default NameInput
