import React, { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from './moviecard.module.css';

const MovieCard = ({ movie, onFavoriteClick, isFavorite }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false); // To track hover state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Cleanup timeout
    return () => clearTimeout(timer);
  }, []);

  const handleFavoriteClick = () => {
    if (onFavoriteClick) {
      onFavoriteClick(movie); // Ensure the function exists before calling
    } else {
      console.error("onFavoriteClick function is not defined");
    }
  };
  
const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <>
      {isLoading ? (
        <div className={styles.cards}>
      
      <Skeleton
  variant="rectangular"
  width={200}
  height={300}
  animation="wave"
  sx={{ bgcolor: '#D0D0D0' }}
  duration={1.5}
/>


        </div>
        
      ) : (
        <div
          className={styles.cards}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
        >
          {/* Image */}
          <img
            className={styles.cards__img}
            src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`}
            alt={movie ? movie.original_title : ""}
          />

          {/* Favorite Icon outside overlay */}
          {!isHovered && (
            <FavoriteIcon
              className={`${styles.favoriteIconOutside} ${isFavorite ? styles.favorite : ""}`}
            />
          )}

          {/* Overlay */}
          <div className={styles.cards__overlay}>
            {isHovered && (
              <FavoriteIcon
                className={`${styles.favoriteIconOverlay} ${isFavorite ? styles.favorite : ""}`}
                onClick={handleFavoriteClick}
              />
            )}
            <div className={styles.card_title}>{movie ? movie.original_title : ""}</div>
            <div className={styles.card__runtime}>
              {movie ? releaseYear : ""}
              <span className={styles.card__rating}>
                {movie ? movie.vote_average.toFixed(1) : ""}
                <span>&#9733;</span>
              </span>
            </div>
            <div className={styles.card__description}>
              {movie ? movie.overview.slice(0, 118) + "..." : ""}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
