
import React, { useState } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`.${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
      <div className={styles.navButtons}>
        <button className={styles.navButton} onClick={() => scrollToSection('mainnet')}>
          Mainnet
        </button>
        <button className={styles.navButton} onClick={() => scrollToSection('testnet')}>
          Testnet
        </button>
      </div>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
        <ul>
          <li><a href="/" style={{ color: 'var(--text-color)' }}>Home</a></li>
          <li><a href="https://nodes.coinhunterstr.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-color)' }}>Nodes</a></li>
          <li><a href="https://coinhunterstr.com/iletisim/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-color)' }}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
