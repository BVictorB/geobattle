import { FC, useEffect, useState } from 'react'
import { Error, Warning, Success } from '@icons'
import './Alert.scss'

interface Props {
  message: string,
  type: string
}

const Alert:FC<Props> = ({ message, type }) => {
  const [show, setShow] = useState<boolean>(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 5000)
  
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null
  
  return (
    <div className={`m-alert m-alert--${type}`}>
      {type === 'error' && <Error color='#740000' />}
      {type === 'success' && <Success color='#005915' />}
      {type === 'warning' && <Warning color='#946a00' />}
      <p>{message}</p>
    </div>
  )
}

export default Alert
