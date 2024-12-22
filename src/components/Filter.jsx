
import React from 'react';

const Filter = ({ genreFilter, setGenreFilter, yearRange, setYearRange, ratingRange, setRatingRange, allGenres }) => {
  return (
    <div className="filters">
      {/* Genre Filter */}
      <select
        value={genreFilter}
        onChange={(e) => setGenreFilter(e.target.value)}
      >
        <option value="">Select Genre</option>
        {allGenres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Year Range Filter */}
      <div className="year-range">
        <input
          type="number"
          value={yearRange[0]}
          onChange={(e) => setYearRange([+e.target.value, yearRange[1]])}
          min="1900"
          max="2024"
        />
        -
        <input
          type="number"
          value={yearRange[1]}
          onChange={(e) => setYearRange([yearRange[0], +e.target.value])}
          min="1900"
          max="2024"
        />
      </div>

      {/* Rating Range Filter */}
      <div className="rating-range">
        <input
          type="number"
          value={ratingRange[0]}
          onChange={(e) => setRatingRange([+e.target.value, ratingRange[1]])}
          min="0"
          max="10"
          step="0.1"
        />
        -
        <input
          type="number"
          value={ratingRange[1]}
          onChange={(e) => setRatingRange([ratingRange[0], +e.target.value])}
          min="0"
          max="10"
          step="0.1"
        />
      </div>
    </div>
  );
};

export default Filter;
