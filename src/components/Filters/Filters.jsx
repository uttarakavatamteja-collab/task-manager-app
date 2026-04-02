import React from 'react';
import styles from './Filters.module.css';
import { Search, Filter } from 'lucide-react';

const Filters = ({ activeFilter, onFilterChange, searchQuery, onSearchChange }) => {
  const filterOptions = ['All', 'Pending', 'Completed'];

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <Search className={styles.searchIcon} size={18} />
        <input 
          type="text" 
          placeholder="Search tasks..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className={styles.filterWrapper}>
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => onFilterChange(option)}
            className={`${styles.filterBtn} ${activeFilter === option ? styles.active : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
