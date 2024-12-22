import React from 'react';
import MovieList from './MovieList';
import styles from './favouritemovies.module.css'


const FavouriteMovies = ({ favoriteMovies, onFavoriteClick }) => {
  return (
    <div className={styles.favouriteMovies}>
      <h2 className={styles.title}>Favorite Movies</h2>
      {favoriteMovies?.length > 0 ? (
        <MovieList
          movieList={favoriteMovies}
          onFavoriteClick={onFavoriteClick}
          favoriteMovies={favoriteMovies}
        />
      ) : (
        <p className={styles.noFavorites}>You have no favorite movies yet.</p>
      )}
    </div>
  );
};

export default FavouriteMovies;

