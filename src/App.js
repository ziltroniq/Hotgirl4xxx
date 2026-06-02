import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import Content from './components/Content';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header onSearch={handleSearch} />
        <Hero />
        <Content />
      </div>
    </div>
  );
}

export default App;