import { useEffect, useState, FormEvent } from 'react'
import io from 'socket.io-client'
import { Map, Chat } from '@components'
import { roundNum, calcDist } from '@utils'

const App = () => {
  const [coords, setCoords] = useState<[number, number]>()
  const [selectedCity, setSelectedCity] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')

  const cities: [number, number][] = [
    [48.8566969, 2.3514616],
    [52.3727598, 4.8936041],
    [41.3828939, 2.1774322],
    [52.5170365, 13.3888599]
  ]

  useEffect(() => {
    setCoords(cities[selectedCity])
  }, [selectedCity])

  const [response, setResponse] = useState('')

  useEffect(() => {
    const socket = io('/')
    socket.on('connect', () => {
      console.log('connected!')
    })
    socket.emit('test', 'test')
    socket.on('test', data => {
      setResponse(data)
    })
  }, [])

  console.log(response)

  const getCoords = async (place: string) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=c2b0d7efe5404c009235e07bcaf81a3a`
  
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        const coords:[number, number] = [
          data.results[0].geometry.lat, 
          data.results[0].geometry.lng
        ]
        return coords
      })
      .catch(_ => null)
  }

  const prevCity = () => {
    setSelectedCity(prevState => prevState - 1)
  }

  const nextCity = () => {
    setSelectedCity(prevState => prevState + 1)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const fetchedCoords = await getCoords(inputValue)
    if (fetchedCoords && coords) {
      const dist = roundNum(calcDist(fetchedCoords, coords), 0)
      console.log(dist < 5 ? 'Goed antwoord!' : `Fout antwoord... je zit er ${dist} km naast`)
    }
    setInputValue('')
  }
  
  return (
    <>
      {coords && <Map position={coords}/>}
      {selectedCity > 0 && <button onClick={prevCity}>prev</button>}
      {selectedCity < cities.length - 1 && <button onClick={nextCity}>next</button>}
      <Chat inputValue={inputValue} setInputValue={setInputValue} onSubmit={handleSubmit}/>
    </>
  )
}

export default App
