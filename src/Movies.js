import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const Movies = ({ movies }) => (
  <Card className="my-4">
    <Card.Header as="h3">Movies filmed here:</Card.Header>
    {movies.length > 0 ? (
      <ListGroup variant="flush">
        {movies.map((movie) => (
          <ListGroup.Item key={movie.id}>
            <Card.Text>{movie.title} ({movie.release_year})</Card.Text>
            <Card.Text>Directed by {movie.director}</Card.Text>
          </ListGroup.Item>
        ))}
      </ListGroup>
    ) : (
      <Card.Body>No movies found for this city.</Card.Body>
    )}
  </Card>
);

export default Movies