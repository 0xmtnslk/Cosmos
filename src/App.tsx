
import React from 'react';

import Footer from './components/Layout/Footer';

import Header from './components/Layout/Header';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <section className="network-section mainnet">
          <h2>Mainnet</h2>
          <div className="network-content">
            {/* Mainnet content will go here */}
          </div>
        </section>
        
        <section className="network-section testnet">
          <h2>Testnet</h2>
          <div className="network-content">
            {/* Testnet content will go here */}
          </div>
        </section>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
