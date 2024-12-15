
import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.socialLinks}>
          <a href="https://coinhunterstr.com/" target="_blank" rel="noopener noreferrer">Web</a>
          <a href="https://x.com/CoinHuntersTR" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.youtube.com/@CoinHuntersTR" target="_blank" rel="noopener noreferrer">Youtube</a>
          <a href="https://t.me/CoinHuntersTR" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://github.com/CoinHuntersTR" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
        <div className={styles.themeToggleContainer}>
          <ThemeToggle />
        </div>
        <div className={styles.copyright}>
          © 2024 CoinHunters™. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
