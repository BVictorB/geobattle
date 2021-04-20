import { FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LocationMarker } from '@components'
import './Admin.scss'

interface Location {
  coords: [number, number],
  city: string,
  continent: string,
  _id: string
}

const Admin:FC = () => {
  const [location, setLocation] = useState<[number, number] | null>(null)
  const [locationData, setLocationData] = useState<{ city: string, continent: string } | null>(null)
  const [locations, setLocations] = useState<Location[] | null>(null)

  useEffect(() => {
    if (location) {
      const fetchDetails = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: location[0],
          lon: location[1]
        })
      }
    
      fetch('/getlocation', fetchDetails)
        .then(res => res.json())
        .then(data => setLocationData(data))
        .catch((err) => console.log(err))
    }
  }, [location])

  useEffect(() => {
    fetch('/getlocations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch((err) => console.log(err))
  }, [])

  const removeLocation = (id: string) => {
    console.log(id)
  }

  return (
    <main>
      <MapContainer
        className='p-admin__map'
        center={{ lat: 45.6, lng: -11.4 }}
        zoom={3}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker location={location} setLocation={setLocation} />
      </MapContainer>
      <div className='p-admin__sidebar'>
        <h2>Existing locations</h2>
        <div className='p-admin__locations'>
          {locations && locations.map((location, index) => (
            <div
              className='p-admin__locations__location'
              onClick={() => setLocation(location.coords)}
              key={index}
            >
              <p>{location.city}</p>
              <p>{location.continent}</p>
              <button onClick={() => removeLocation(location._id)}>Remove</button>
            </div>
          ))}
        </div>
        <h2>Add new location</h2>
        {locationData && <div>
          <p>{locationData.city}</p>
          <p>{locationData.continent}</p>
        </div>}
      </div>
    </main>
  )
}

export default Admin
