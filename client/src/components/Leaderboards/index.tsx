import { FC, useState, useEffect } from 'react'
import { Loader } from 'components'
import './Leaderboards.scss'
const { REACT_APP_API: api } = process.env

const Leaderboards:FC = () => {
  const [leaderboards, setLeaderboards] = useState<{ username: string, points: number }[]>()
  
  useEffect(() => {
    fetch(`${api}/getleaderboards`)
      .then(res => res.json())
      .then(data => setLeaderboards(data))
      .catch((err) => console.log(err))
  }, [])

  if (!leaderboards) return <Loader />

  return (
    <div className='m-leaderboards'>
      <h2 className='m-leaderboards__title'>Leaderboards</h2>
      {leaderboards.map((user, index) => (
        <div className='m-leaderboards__container'>
          <p className='m-leaderboards__place'>{index + 1}</p>
          <div className='m-leaderboards__side'>
            <p className='m-leaderboards__name'>{user.username}</p>
            <p className='m-leaderboards__points'>{user.points} points</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Leaderboards
