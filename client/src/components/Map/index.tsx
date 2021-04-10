import { useState, useMemo, useEffect } from 'react'
import Leaflet from 'leaflet'
import { Socket } from 'socket.io-client'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'

interface Props {
  socket: Socket
}

const ChangePosition = ({ map, position }:any) => {
  useEffect(() => map.setView(position), [position, map])
  return <></>
}

const Map = ({ socket }: Props) => {
  const [coords, setCoords] = useState<[number, number]>([0,0])
  const [map, setMap] = useState<Leaflet.Map>()

  useEffect(() => {
    socket.on('coords', ({ coords }: { coords: [number, number] }) => {
      setCoords(coords)
    })
  }, [socket])
  
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
      {map && coords ? <ChangePosition map={map} position={coords} /> : null}
    </>
  )
}

export default Map
