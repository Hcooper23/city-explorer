import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const CityMovies = ({ movies }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const filteredMovies = movies.filter(movie => movie.poster !== null);

  return (
    <div>
      <h3>Movies About The City</h3>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {filteredMovies.map((movie, movieIndex) => (
          <Carousel.Item key={movieIndex}>
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
              alt={movie.title}
              style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
              <Carousel.Caption className='carousel-caption' >
                <h5>{movie.title}</h5>
              </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CityMovies;