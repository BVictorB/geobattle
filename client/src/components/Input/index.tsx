import { Dispatch } from 'react'
import './Input.scss'

interface Props {
  type?: string,
  label?: string,
  value?: string,
  onChange: Dispatch<string>,
  autoFocus?: boolean,
  placeholder?: string
}

const Input = ({ type, label, value, onChange, autoFocus, placeholder }: Props) => (
  <div className='input'>
    {label ? 
      <label>
        {label}
        <input
          type={type ? type : 'text'}
          placeholder={placeholder}
          value={value && value}
          onChange={e => onChange(e.target.value)}
          autoFocus={autoFocus && autoFocus}
        />
      </label> 
    :
      <input
        type={type ? type : 'text'}
        placeholder={placeholder}
        value={value && value}
        onChange={e => onChange(e.target.value)}
        autoFocus={autoFocus && autoFocus}
      />
    }
  </div>
)

export default Input
