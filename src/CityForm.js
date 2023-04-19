import React from 'react';
import { Form, Button } from 'react-bootstrap';

function CityForm({ onSubmit, onChange }) {
  return (
    <Form id="cityForm" onSubmit={onSubmit}>
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
            onChange={onChange}
          ></Form.Control>
          <Button id="formButton" type="submit" variant="info" size="lg">
            Explore!
          </Button>
        </Form.Group>
      </fieldset>
    </Form>
  );
}

export default CityForm;