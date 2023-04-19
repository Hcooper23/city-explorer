import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
import CityForm from './CityForm';
import CityInfo from './CityInfo';
import CityMap from './CityMap';
import ErrorAlert from './ErrorAlert';
import Weather from './Weather';

function App() {
  const [city, setCity] = useState('');
  const [mapIsDisplaying, setMapIsDisplaying] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forecast, setForecast] = useState([]);

  const handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      const locationUrl = `/api/location?city=${city}`;
      const locationData = await axios.get(locationUrl);

      setMapIsDisplaying(true);
      setError(false);

      const weatherUrl = `/api/weather?lat=${locationData.data.lat}&lon=${locationData.data.lon}`;
      const weatherData = await axios.get(weatherUrl);
      setForecast(weatherData.data.daily);
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
      <CityForm
        city={city}
        onChange={cityChange}
        onSubmit={handleCitySubmit}
      />

      {error ? (
        <ErrorAlert errorMessage={errorMessage} />
      ) : (
        <>
          <CityInfo city={city} />
          <CityMap
            lat={forecast.length ? forecast[0].lat : ''}
            lon={forecast.length ? forecast[0].lon : ''}
            mapIsDisplaying={mapIsDisplaying}
          />
          <Weather forecast={forecast} />
        </>
      )}
    </>
  );
}

export default App;