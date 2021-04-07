import { Dispatch } from 'react'

interface Props {
  onChange: Dispatch<string>
}

const Input = ({ onChange }: Props) => (
  <input
    type="text"
    onChange={e => onChange(e.target.value)}
  />
)

export default Input
