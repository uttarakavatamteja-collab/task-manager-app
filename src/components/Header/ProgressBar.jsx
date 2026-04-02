import React from 'react';
import styles from './ProgressBar.module.css';
import { motion as Motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  return (
    <div className={styles.container}>
      <div className={styles.barBackground}>
        <Motion.div 
          className={styles.barForeground}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <span className={styles.label}>{Math.round(progress)}% Complete</span>
    </div>
  );
};

export default ProgressBar;
