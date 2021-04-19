import { FC, Dispatch } from 'react'
import './Input.scss'

interface Props {
  type?: string,
  label?: string,
  value?: string,
  onChange: Dispatch<string>,
  autoFocus?: boolean,
  placeholder?: string
}

const Input:FC<Props> = ({ type, label, value, onChange, autoFocus, placeholder }) => (
  <div className='m-input'>
    {label ? 
      <label className='m-input__label'>
        {label}
        <input
          className='m-input__input'
          type={type ? type : 'text'}
          placeholder={placeholder}
          value={value && value}
          onChange={e => onChange(e.target.value)}
          autoFocus={autoFocus && autoFocus}
        />
      </label> 
    :
      <input
        className='m-input__input'
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
