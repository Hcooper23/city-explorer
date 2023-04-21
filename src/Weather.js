import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class CityWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { forecasts } = this.props;
    const forecast = forecasts[0]; // Select the first forecast object in the array
    return (
      <div>
        <Card style={{ marginBottom: '1rem' }}>
          <Card.Header>
            {forecast.date}
          </Card.Header>
          <Card.Body>
            <Card.Text>Description: {forecast.description}</Card.Text>
            <Card.Text>
              High Temperature: {forecast.temperatures.max} °F
            </Card.Text>
            <Card.Text>
              Low Temperature: {forecast.temperatures.min} °F
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CityWeather;