import { useState, useMemo, useEffect } from 'react'
import Leaflet from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface Props {
  position: [number, number]
}

const ChangePosition = ({ map, position }:any) => {
  useEffect(() => map.setView(position), [position, map])
  return <></>
}

const Map = ({ position }: Props) => {
  const [map, setMap] = useState<Leaflet.Map>()
  
  const displayMap = useMemo(
    () => (
      <MapContainer 
        className='map'
        whenCreated={(map: Leaflet.Map) => setMap(map)}
        zoom={30}
        doubleClickZoom={false}
        dragging={false}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
      </MapContainer>
    ), []
  )

  return (
    <>
      {displayMap}
      {map ? <ChangePosition map={map} position={position} /> : null}
    </>
  )
}

export default Map
