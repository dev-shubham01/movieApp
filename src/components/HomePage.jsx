import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import styles from './homepage.module.css';
import MovieList from './MovieList';
import FavouriteMovies from './FavouriteMovies';

export default function HomePage() {
  const [movieData, setMovieData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
  const BASE_URL = 'https://api.themoviedb.org/3';

  const fetchMovies = useCallback(async (url, append = false) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        setMovieData((prev) => (append ? [...prev, ...responseJson.results] : responseJson.results));
        setHasMore(responseJson.results.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const buildApiUrl = (query, page) => {
    const endpoint = query ? 'search/movie' : 'movie/popular';
    const queryParam = query ? `&query=${query}` : '';
    return `${BASE_URL}/${endpoint}?${API_KEY}&page=${page}${queryParam}`;
  };

  useEffect(() => {
    setPage(1);
    const url = buildApiUrl(searchValue, 1);
    fetchMovies(url);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [searchValue, fetchMovies]);

  useEffect(() => {
    if (page > 1) {
      const url = buildApiUrl(searchValue, page);
      fetchMovies(url, true);
    }
  }, [page, searchValue, fetchMovies]);

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
      if (isFavorite) {
        return prev.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prev, movie];
      }
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
