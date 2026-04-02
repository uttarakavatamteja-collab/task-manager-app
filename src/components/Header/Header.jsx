import React from 'react';
import styles from './Header.module.css';
import { ListTodo } from 'lucide-react';

const Header = ({ total, completed }) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <ListTodo className={styles.icon} />
        <h1>Taskly</h1>
      </div>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total</span>
          <span className={styles.statValue}>{total}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Done</span>
          <span className={styles.statValue}>{completed}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
