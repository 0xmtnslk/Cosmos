
import React from 'react';
import Header from './components/Layout/Header';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <h1>Hoş Geldiniz</h1>
        <p>Modern web uygulamanız hazır!</p>
      </main>
    </div>
  );
}
