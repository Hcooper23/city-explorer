import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import CityForm from './CityForm';
import CityCard from './Card';
import ErrorAlert from './ErrorAlert';
import Weather from './Weather';


class Main extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          city: '',
           cityData: [],
           mapUrl: '',
           error: false,
           errorMessage: '',
           forecasts: [],
           showWeather: false
       }
   }

  handleCityInput = (event) => {
      this.setState({
          city: event.target.value
       })
   }

   getCityData = async (event) => {
       event.preventDefault();
       try {
          let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`
          let cityData = await axios.get(url);
          console.log('city data', cityData)
           let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=12&size=600x400&format=png`

           this.setState({ cityData: cityData.data[0], mapUrl: mapUrl, error: false });

           let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}&searchQuery=${this.state.city}`;

           let weatherData = await axios.get(weatherUrl);

           this.setState({ forecasts: weatherData.data, showWeather: true, error: false });

       } catch (error) {
           this.setState({ error: true, errorMessage: error.message });
       }
  };
  render() {
      return (
          <Container>
              <Row>
                  <Col>
                      <h2 className='city-header'>Travel Around The Globe From Home</h2>
                      <CityForm onFormSubmit={this.getCityData} onCityInputChange={this.handleCityInput} />
                  </Col>
              </Row>
              <Row>
                  <Col>
                      {this.state.error ? (
                          <ErrorAlert errorMessage={this.state.errorMessage} />
                      ) : (
                          <CityCard cityData={this.state.cityData} />
                      )}
                  </Col>
              </Row>
              <Row>
                  <Col className='city-map'>
                      {this.state.mapUrl && (
                          <Image src={this.state.mapUrl} alt='Map of the city' />
                       )}
                   </Col>
               </Row>
               {this.state.showWeather && (
                   <Row>
                       <Col>
                           <Weather forecasts={this.state.forecasts} />
                       </Col>
                   </Row>
               )}
           </Container>
       )
   }
}
export default Main;