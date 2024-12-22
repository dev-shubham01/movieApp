import React from "react";
import styles from "./navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = ({  setSearchText, searchText }) => (
  <header className={styles.header}>
    <div className={styles.content}>
      <h1 className={styles.heading}>Movie Hub</h1>

      <div className={styles.searchbar}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for movies..."
          className={styles.searchInput}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          
        />
      </div>
    </div>
  </header>
);

export default Navbar;
