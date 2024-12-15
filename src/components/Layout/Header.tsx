
import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img 
          src="https://coinhunterstr.com/wp-content/uploads/2022/12/CH_logo.webp" 
          alt="CoinHunters Logo" 
          className={styles.logo}
        />
        <span className={styles.logoText}>CoinHunters Service</span>
      </div>
      <nav>
        <ul>
          <li><a href="/">Ana Sayfa</a></li>
          <li><a href="/about">Hakkımızda</a></li>
          <li><a href="/contact">İletişim</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
