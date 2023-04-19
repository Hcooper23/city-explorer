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
  const [cityForecast, setCityForecast] = useState([]);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');


  // class Main extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       city: '',
  //       cityData: [],
  //       mapUrl: '',
  //       error: false,
  //       errorMessage: '',
  //       forecasts: [],
  //       showWeather: false
  //     }
  //   };

  const handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      const locationUrl = `https://us1.locationiq.com/v1/search?key=pk.5516320d1ba7f4e7a3f49deeba72bbf5&q=${city}&format=json`
      // console.log(locationUrl)
      // console.log(process.env.REACT_APP_LOCATIONIQ_API_KEY)
      // this.getMovieData();
      const cityData = await axios.get(locationUrl);
      // cityData.data()
      // console.log(cityData)
      setMapIsDisplaying(true);
      setError(false);
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}&searchQuery=${this.state.city}`;

      // const weatherUrl = `http://localhost:3001/weather?searchQuery=${city}`;
      console.log('This is the weather URL', weatherUrl)
      // const weatherUrl = `https://cityexplorerapi-z0rk.onrender.com/weather?city=${city}`;
      const weatherData = await axios.get(weatherUrl);
      setForecast(weatherData.data);
      setCityForecast(cityData.data[0]);
      setLat(cityData.data[0].lat);
      setLon(cityData.data[0].lon);

      // console.log('This is the weather data daily', weatherData.data)
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  const cityChange = (e) => {
    setCity(e.target.value);
  };
  // render() {
    console.log('this is the lat',lat);
  return (
    <>
    <h1>City Explorer</h1>
    <CityForm
      city={city}
      onChange={cityChange}
      onSubmit={handleCitySubmit} />

      {
        error ? (
          <ErrorAlert errorMessage={errorMessage} />
        ) : (
          <>
            <CityInfo city={city} />
            <CityMap
              lat={lat}
              lon={lon}
              // lat={cityForecast.length ? cityForecast.lat : ''}
              // lon={cityForecast.length ? cityForecast.lon : ''}
              mapIsDisplaying={mapIsDisplaying}
            />
            {/* {forecast.length > 0 && <Weather city={city} />} */}
          </>
        )
      }
    </>
  );
}

// }


export default App;