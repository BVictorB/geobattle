import React, { useState, useMemo, useEffect } from 'react'
import Leaflet from 'leaflet'
import { Socket } from 'socket.io-client'
import { MapContainer, TileLayer } from 'react-leaflet'
import { RoomInterface } from '@interfaces'
import 'leaflet/dist/leaflet.css'
import './Map.scss'

interface Props {
  socket: Socket
}

const ChangePosition = ({ map, position }:any) => {
  useEffect(() => map.setView(position), [position, map])
  return <></>
}

const Map: React.FC<Props> = ({ socket }) => {
  const [coords, setCoords] = useState<[number, number]>([0,0])
  const [map, setMap] = useState<Leaflet.Map>()

  useEffect(() => {
    socket.on('roomData', (data: RoomInterface) => {
      if (data.round !== data.rounds) {
        setCoords(data.coords[data.round].coords)
      }
    })
  }, [socket])

  const displayMap = useMemo(
    () => (
      <MapContainer 
        className='m-map'
        whenCreated={(map: Leaflet.Map) => setMap(map)}
        zoom={30}
        doubleClickZoom={false}
        dragging={false}
        zoomControl={false}
        scrollWheelZoom={false}
        attributionControl={false}
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
