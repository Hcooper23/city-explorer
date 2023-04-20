import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CityForm = ({ onFormSubmit, onCityInputChange }) => {
  return (
    <Form className='city-form' onSubmit={onFormSubmit}>
      <Form.Group className='city-form-label'>
        <Form.Label>Please enter a city of your choice below. This will generate the following data for you: city name, latitude, and longitude. Additionally, it will display a rendered image of the city at a zoom level of 11.</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Control type="text" onChange={onCityInputChange} />
      </Form.Group>
      <Form.Group>
        <Button className='city-button' type='submit'>Explore!</Button>
      </Form.Group>
    </Form>
  );
};

export default CityForm;