import { FC, useEffect, useState } from 'react'
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
      {message}
    </div>
  )
}

export default Alert
