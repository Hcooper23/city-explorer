import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Movie from './Movie';

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
          <Movie key={movieIndex} movie={movie} />
        ))}
      </Carousel>
    </div>
  );
};

export default CityMovies;