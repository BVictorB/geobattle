import React, { Dispatch } from 'react'
import './Input.scss'

interface Props {
  type?: string,
  label?: string,
  value?: string,
  onChange: Dispatch<string>,
  autoFocus?: boolean,
  placeholder?: string
}

const Input: React.FC<Props> = ({ type, label, value, onChange, autoFocus, placeholder }) => (
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
