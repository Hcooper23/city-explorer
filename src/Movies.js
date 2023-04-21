import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const Movie = ({ title, releaseYear, director, coverPhotoUrl, description }) => (
  <ListGroup.Item>
    <Card.Text>{title} ({releaseYear})</Card.Text>
    <Card.Text>Directed by {director}</Card.Text>
    <Card.Text>{description}</Card.Text>
    <img src={coverPhotoUrl} alt={title} width={300} height={300} />
  </ListGroup.Item>
);

export default Movie;