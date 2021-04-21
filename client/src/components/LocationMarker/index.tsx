import { FC, Dispatch, useEffect } from 'react'
import { Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { logo } from '@assets'

interface Props {
  location: [number, number] | null,
  setLocation: Dispatch<[number, number] | null>
}

const markerIcon = new L.Icon({
  iconUrl: logo,
  iconRetinaUrl: logo,
  popupAnchor:  [-0, -0],
  iconSize: [90,45]
})

const LocationMarker:FC<Props> = ({ location, setLocation }) => {
  const map = useMapEvents({
    click(e) {
      setLocation([e.latlng.lat, e.latlng.lng])
    }
  })

  useEffect(() => {
    location && map.flyTo({ lat: location[0], lng: location[1] }, 13)
  }, [location, map])

  return location && <Marker icon={markerIcon} position={location}/>
}

export default LocationMarker
