import { FC, Dispatch } from 'react'
import { camelCase } from '@utils'
import './Select.scss'

interface Props {
  label: string,
  options: string[],
  onChange: Dispatch<string>
}

const Select:FC<Props> = ({ label, options, onChange }) => (
  <label className='m-select'>
    {label}
    <select className='m-select__select' onChange={e => onChange(e.target.value)}>
      {options.map((option, index) => <option key={index} value={camelCase(option)}>{option}</option>)}
    </select>
  </label>
)

export default Select
