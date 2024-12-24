

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';

// Build API URL based on query and page
export const buildApiUrl = (query, page) => {
  const endpoint = query ? 'search/movie' : 'movie/popular';
  const queryParam = query ? `&query=${query}` : '';
  return `${BASE_URL}/${endpoint}?${API_KEY}&page=${page}${queryParam}`;
};


export const fetchMovies = async (url) => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};




