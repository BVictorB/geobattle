import { FC, Dispatch } from 'react'
import './Radio.scss'

interface Props {
  label: string,
  options: string[],
  state: string,
  onChange: Dispatch<string>
}

const Radio:FC<Props> = ({ label, options, state, onChange }) => (
  <div className='m-radio'>
    <label className='m-radio'>
      {label}
    </label>
    <div className='m-radio__buttons'>
      {options.map((option, index) => (
        <button 
          key={index} 
          type={'button'} 
          className={state === option ? 'm-radio__button m-radio__button--active' : 'm-radio__button'}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
)

export default Radio
