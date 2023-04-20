import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import CityForm from './CityForm';
import CityCard from './Card';
import ErrorAlert from './ErrorAlert';
import CityWeather from './Weather';
import Movies from './Movies';

class Main extends Component {
  state = {
    city: '',
    cityData: {},
    mapUrl: '',
    error: false,
    errorMessage: '',
    forecasts: [],
    showWeather: false,
    movies: [],
  };

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  getCityData = async (event) => {
    event.preventDefault();

    const { city } = this.state;
    console.log(city);
    try {
      const cityDataResponse = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${city}&format=json`);
      const cityData = cityDataResponse.data[0];
      const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${cityData.lat},${cityData.lon}&zoom=11&size=600x400&format=png`;

      const moviesResponse = await axios.get(`${process.env.REACT_APP_SERVER}/movies?city=${city}`);
      const movies = moviesResponse.data;


      const weatherDataResponse = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${cityData.lat}&lon=${cityData.lon}&searchQuery=${city}`);
      const forecasts = weatherDataResponse.data;
      console.log(cityData, mapUrl, movies, forecasts);
      this.setState({
        cityData,
        mapUrl,
        movies,
        forecasts,
        showWeather: true,
        error: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
      });
    }
    console.log(city);
  };


  render() {
    const {
      cityData, mapUrl, error, errorMessage, showWeather, forecasts, movies,
    } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <h2 className="city-header">City and Weather Explorer Using JSON</h2>
            <CityForm onFormSubmit={this.getCityData} onCityInputChange={this.handleCityInput} />
          </Col>
        </Row>
        <Row>
          <Col>
            {error ? <ErrorAlert errorMessage={errorMessage} /> : <CityCard cityData={cityData} />}
          </Col>
        </Row>
        <Row>
          <Col className="city-map">{mapUrl && <Image src={mapUrl} alt="Map of the city" />}</Col>
        </Row>
        {showWeather && (
          <Row>
            <Col>
              <CityWeather forecasts={forecasts} />
            </Col>
          </Row>
        )}
        {movies.length > 0 && (
          <Row>
            <Col>
              <Movies movies={movies} />
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default Main;