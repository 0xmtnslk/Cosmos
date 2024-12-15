
import React from 'react';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      🌓
    </button>
  );
};

export default ThemeToggle;
