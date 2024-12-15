
import React, { useState } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img 
          src="https://coinhunterstr.com/wp-content/uploads/2022/12/CH_logo.webp" 
          alt="CoinHunters Logo" 
          className={styles.logo}
        />
        <span className={styles.logoText} style={{ color: 'var(--text-color)' }}>CoinHunters Service</span>
      </div>
      <button onClick={toggleMenu} className={styles.menuButton}>
        ☰
      </button>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
        <ul>
          <li><a href="/" style={{ color: 'var(--text-color)' }}>Ana Sayfa</a></li>
          <li><a href="/about" style={{ color: 'var(--text-color)' }}>Hakkımızda</a></li>
          <li><a href="/contact" style={{ color: 'var(--text-color)' }}>İletişim</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
