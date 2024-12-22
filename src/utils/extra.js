import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import styles from './homepage.module.css';
import MovieList from './MovieList';

export default function HomePage() {
  const [movieData, setMovieData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
  const BASE_URL = 'https://api.themoviedb.org/3';

  // Fetch data from API (handles both search and popular movies)
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

  // Build API URL based on search value and page
  const buildApiUrl = (query, page) => {
    const endpoint = query ? 'search/movie' : 'movie/popular';
    const queryParam = query ? `&query=${query}` : '';
    return `${BASE_URL}/${endpoint}?${API_KEY}&page=${page}${queryParam}`;
  };

  // Initial or search-triggered data fetch
  useEffect(() => {
    setPage(1); // Reset page when search value changes
    const url = buildApiUrl(searchValue, 1);
    fetchMovies(url);

    // Scroll to top when a search is performed
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    });
  }, [searchValue, fetchMovies]);

  // Infinite scrolling data fetch
  useEffect(() => {
    if (page > 1) {
      const url = buildApiUrl(searchValue, page);
      fetchMovies(url, true);
    }
  }, [page, searchValue, fetchMovies]);

  // Infinite scrolling handler
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

  // Add and clean up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.homePage}>
      
        <Navbar searchText={searchValue} setSearchText={setSearchValue} />
     
      <MovieList movieList={movieData} />
      {isLoading && (
        <div className={styles.loader}>
          <p>Loading...</p>
        </div>
      )}
      {!hasMore && <p>No more movies to load.</p>}
    </div>
  );
}
