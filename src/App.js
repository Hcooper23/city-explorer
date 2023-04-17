import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Alert, Form, Button, ListGroup, Image } from 'react-bootstrap';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [mapIsDisplaying, setMapIsDisplaying] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      let cityUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${city}&format=json`;
      let cityInfo = await axios.get(cityUrl);

      setLat(cityInfo.data[0].lat);
      setLon(cityInfo.data[0].lon);
      setMapIsDisplaying(true);
      setError(false);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  const cityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <h1>City Explorer</h1>
      <Form id="cityForm" onSubmit={handleCitySubmit}>
        <fieldset htmlFor="cityName">
          <legend htmlFor="cityName">
            Please enter a city of your choice below. This will generate the following data for you: city name, latitude, and longitude. Additionally, it will display a rendered image of the city at a zoom level of 11.
          </legend>
          <Form.Group className="mb-3">
            <br />
            <Form.Label htmlFor="cityName"></Form.Label>
            <Form.Control
              type="text"
              id="cityName"
              placeholder="e.g. Denver"
              onChange={cityChange}
            ></Form.Control>
            <Button id="formButton" type="submit" variant="info" size="lg">
              Explore!
            </Button>
          </Form.Group>
        </fieldset>
      </Form>

      {error ? (
        <Alert variant="danger" id="errorAlert">
          <Alert.Heading>Error</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      ) : (
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
      )}
    </>
  );
}

export default App;