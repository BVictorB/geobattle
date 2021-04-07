import { useEffect, useState, FormEvent } from 'react'
import { Map, Chat } from '@components'

const App = () => {
  const [coords, setCoords] = useState<[number, number]>([52.3727598, 4.8936041])
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

  const calcDistance = <T extends [number, number]>(firstCoords:T, secondCoords:T) => {
    if (firstCoords === secondCoords) {
      return 0
    } else {
      const 
        [lat1, lon1] = firstCoords,
        [lat2, lon2] = secondCoords,
        radlat1 = Math.PI * lat1/180,
        radlat2 = Math.PI * lat2/180,
        radtheta = Math.PI * (lon1-lon2)/180

      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
      if (dist > 1) {
        dist = 1
      }
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      dist = dist * 1.609344
      return dist
    }
  }

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
    if (fetchedCoords) {
      console.log(fetchedCoords)
      const dist = calcDistance(fetchedCoords, coords)
      console.log(dist)
    }
    setInputValue('')
  }
  
  return (
    <>
      <Map position={coords}/>
      {selectedCity > 0 && <button onClick={prevCity}>prev</button>}
      {selectedCity < cities.length - 1 && <button onClick={nextCity}>next</button>}
      <Chat inputValue={inputValue} setInputValue={setInputValue} onSubmit={handleSubmit}/>
    </>
  )
}

export default App
