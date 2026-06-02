import React, { useState } from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  return (
    <header className="header">
      <div className="logo">HOTGIRL4XXX</div>
      <input
        className="search"
        type="text"
        placeholder="Rechercher..."
        value={searchInput}
        onChange={handleSearchChange}
      />
    </header>
  );
};

export default Header;