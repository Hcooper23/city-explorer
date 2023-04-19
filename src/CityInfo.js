import React from 'react';
import { ListGroup, Image } from 'react-bootstrap';

function CityInfo({ city, lat, lon, mapIsDisplaying }) {
  return (
    <>
      <ListGroup id="lat-lon">
        <ListGroup.Item variant="primary" id="thisCity">
          {city}
        </ListGroup.Item>
        <ListGroup.Item variant="success" id="thisLat">
          Latitude: {lat}
        </ListGroup.Item>
        <ListGroup.Item variant="info" id="thisLon">
          Longitude: {lon}
        </ListGroup.Item>
      </ListGroup>

      <div id="map">
        {mapIsDisplaying && (
          <Image
            id="cityMap"
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${lat},${lon}&zoom=11`}
            alt={city}
          ></Image>
        )}
      </div>
    </>
  );
}

export default CityInfo;