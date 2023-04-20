import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class CityWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleToggleDetails = (index) => {
    this.setState((prevState) => ({
      [index]: !prevState[index],
    }));
  };

  render() {
    const { forecasts } = this.props;
    return (
      <div>
        {forecasts.map((forecast, index, temperatures) => (
          <Card key={index} style={{ marginBottom: '1rem' }}>
            <Card.Header>
              {forecast.date}
              <Button
                variant='link'
                onClick={() => this.handleToggleDetails(index)}
              >
                Show/Hide Details
              </Button>
            </Card.Header>
            {this.state[index] && (
              <Card.Body>
                <Card.Text>Description: {forecast.description}</Card.Text>
                <Card.Text>
                  High Temperature: {forecast.temperatures.max} °F
                </Card.Text>
                <Card.Text>
                  Low Temperature: {forecast.temperatures.min} °F
                </Card.Text>
              </Card.Body>
            )}
          </Card>
        ))}
      </div>
    );
  }
}

export default CityWeather;