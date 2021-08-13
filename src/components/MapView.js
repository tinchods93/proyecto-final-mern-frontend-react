import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../assets/Map.css';
const MapView = ({ place }) => {
  const position = [place.latitude, place.longitude];

  return (
    <MapContainer center={position} zoom={13} className='map__body'>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>{place.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
