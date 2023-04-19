import React from 'react';
import { Image } from 'react-bootstrap';

const CityMap = ({ lat, lon, city }) => {
  return (
    <div id="map">
      <Image
        id="cityMap"
        src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${lat},${lon}&zoom=11`}
        alt={city}
      ></Image>
    </div>
  );
};

export default CityMap;