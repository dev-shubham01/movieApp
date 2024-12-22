import React from 'react';
import MovieCard from './MovieCard';
import styles from './movielist.module.css';

const MovieList = ({ movieList, onFavoriteClick, favoriteMovies }) => {
  return (
    <div className={styles.movieList}>
      
      <div className={styles.listCards}>
        {movieList && movieList.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteClick={onFavoriteClick}
            isFavorite={favoriteMovies?.some(fav => fav.id === movie.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList;
