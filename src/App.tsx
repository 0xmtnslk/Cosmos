
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
        <h1>Hoş Geldiniz</h1>
        <p>Modern web uygulamanız hazır!</p>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
