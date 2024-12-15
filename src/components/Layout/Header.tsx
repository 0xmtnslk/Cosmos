
import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
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
