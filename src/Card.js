import React from 'react';
import { Card } from 'react-bootstrap';

const CityCard = ({ cityData }) => (
    <Card className='city-display'>
        <Card.Body>
            <Card.Title>{cityData.display_name}</Card.Title>
            <Card.Text>Latitude: {cityData.lat}</Card.Text>
            <Card.Text>Longitude: {cityData.lon}</Card.Text>
        </Card.Body>
    </Card>
);

export default CityCard;