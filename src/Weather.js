import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather(props) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://cityexplorerapi-z0rk.onrender.com/weather?city=${props.city}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.city]);

  if (!weatherData) {
    return null;
  }

  const temperature = Math.round(weatherData.main.temp - 273.15);
  const description = weatherData.weather[0].description;

  return (
    <div>
      <h2>Current Weather in {props.city}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
    </div>
  );
}

export default Weather;