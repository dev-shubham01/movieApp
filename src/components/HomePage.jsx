import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import styles from './homepage.module.css';
import MovieList from './MovieList';
import FavouriteMovies from './FavouriteMovies';
import { buildApiUrl, fetchMovies } from '../utils/utils'; 

export default function HomePage() {
  const [movieData, setMovieData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorite movies from local storage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteMovies');
    if (savedFavorites) {
      setFavoriteMovies(JSON.parse(savedFavorites));
    }
  }, []);

  const fetchAndSetMovies = useCallback(
    async (url, append = false) => {
      setIsLoading(true);
      const movies = await fetchMovies(url);
      setMovieData((prev) => (append ? [...prev, ...movies] : movies));
      setHasMore(movies.length > 0);
      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    setPage(1);
    const url = buildApiUrl(searchValue, 1);
    fetchAndSetMovies(url);

    // Reset to movies list if we're currently viewing favorites
    setShowFavorites(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [searchValue, fetchAndSetMovies]);

  useEffect(() => {
    if (page > 1) {
      const url = buildApiUrl(searchValue, page);
      fetchAndSetMovies(url, true);
    }
  }, [page, searchValue, fetchAndSetMovies]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight &&
      !isLoading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleFavoriteClick = (movie) => {
    setFavoriteMovies((prev) => {
      const isFavorite = prev.some((fav) => fav.id === movie.id);
      const updatedFavorites = isFavorite
        ? prev.filter((fav) => fav.id !== movie.id)
        : [...prev, movie];

      // Save updated favorites to local storage
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const showMoviesList = () => {
    setShowFavorites(false);
  };

  const showFavoriteMovies = () => {
    setShowFavorites(true);
  };

  return (
    <div className={styles.homePage}>
      <Navbar searchText={searchValue} setSearchText={setSearchValue} />
      <div className={styles.buttonSection}>
        <button
          className={`${styles.toggleButton} ${!showFavorites ? styles.active : ''}`}
          onClick={showMoviesList}
        >
          Movies
        </button>
        <button
          className={`${styles.toggleButton} ${showFavorites ? styles.active : ''}`}
          onClick={showFavoriteMovies}
        >
          Favourites
        </button>
      </div>

      {showFavorites ? (
        <FavouriteMovies
          favoriteMovies={favoriteMovies}
          onFavoriteClick={handleFavoriteClick}
        />
      ) : (
        <MovieList
          movieList={movieData}
          onFavoriteClick={handleFavoriteClick}
          favoriteMovies={favoriteMovies}
        />
      )}

      {isLoading && (
        <div className={styles.loader}>
          <p>Loading...</p>
        </div>
      )}
      {!hasMore && <p>No more movies to load.</p>}
    </div>
  );
}
