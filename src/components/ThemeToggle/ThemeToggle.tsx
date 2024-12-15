
import React, { useState } from 'react';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      <span className={styles.icon}>{isDark ? '🌙' : '☀️'}</span>
      <span className={styles.text}>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
};

export default ThemeToggle;
