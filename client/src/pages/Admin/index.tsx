import { FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Leaflet from 'leaflet'
import { LocationMarker, Loader, Alert } from '@components'
import { deCamelize, camelize } from '@utils'
import './Admin.scss'

interface Location {
  coords: [number, number],
  city: string,
  continent: string,
  _id: string
}

interface LocationRequest {
  err: boolean,
  message: string,
  locations?: Location[]
}

const Admin:FC = () => {
  const 
    [location, setLocation] = useState<[number, number] | null>(null),
    [locationData, setLocationData] = useState<{ city: string, continent: string } | null>(null),
    [locations, setLocations] = useState<Location[] | null>(null),
    [alert, setAlert] = useState<string | null>(null),
    [alertType, setAlertType] = useState<string | null>(null),
    southWest = Leaflet.latLng(-90, -180),
    northEast = Leaflet.latLng(90, 180),
    bounds = Leaflet.latLngBounds(southWest, northEast)

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

  const addLocation = () => {
    if (!locationData || !location) return
    setAlert(null)
    setAlertType(null)

    const fetchDetails = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coords: location,
        city: locationData.city,
        continent: camelize(locationData.continent)
      })
    }
  
    fetch('/createlocation', fetchDetails)
      .then(res => res.json())
      .then(data => handleLocationRequest(data))
      .catch((err) => console.log(err))
  }

  const removeLocation = (id: string) => {
    const fetchDetails = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    }
  
    fetch('/removelocation', fetchDetails)
      .then(res => res.json())
      .then(data => handleLocationRequest(data))
      .catch((err) => console.log(err))
  }

  const handleLocationRequest = (data: LocationRequest) => {
    if (!data.err && data.locations) {
      setLocations(data.locations)
      setLocationData(null)
      setLocation(null)
      setAlertType('success')
      setAlert(data.message)
      return
    }
    setAlert(data.message)
    setAlertType('error')
  }

  return (
    <main className='p-admin'>
      {alert && alertType && <Alert message={alert} type={alertType} />}
      <MapContainer
        className='p-admin__map'
        center={{ lat: 45.6, lng: -11.4 }}
        zoom={4}
        minZoom={4}
        attributionControl={false}
        maxBoundsViscosity={1.0}
        maxBounds={bounds}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          noWrap={true}
        />
        <LocationMarker location={location} setLocation={setLocation} />
      </MapContainer>
      <div className='p-admin__sidebar'>
        <h2>Add new location</h2>
        <p>To add a new location, just place a marker on the map and click on the button below.</p>
        {location && !locationData && <Loader />}
        {locationData && <div>
          <h3>Selected location:</h3>
          <p>City: {locationData.city}</p>
          <p>Continent: {locationData.continent}</p>
          <button 
            className='wide-button'
            onClick={() => addLocation()}
          >
            Add location
          </button>
        </div>}
        <h2>Existing locations</h2>
        <div className='p-admin__locations'>
          {!locations && <Loader />}
          {locations && locations.map((location, index) => (
            <div
              className='p-admin__locations__location'
              onClick={() => setLocation(location.coords)}
              key={index}
            >
              <p className='p-admin__locations__location__city'>{location.city}</p>
              <p>{deCamelize(location.continent)}</p>
              <button onClick={() => removeLocation(location._id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Admin
