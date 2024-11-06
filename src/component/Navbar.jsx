import React, { useState } from 'react';
import './Css.css';
// Import image if it's in src/assets or any other directory in src
import newspaperImg from '../img/newspaper.png';

const Navbar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="navbar">
      <img src={newspaperImg} alt="Newspaper" />
      <h1>NewsFeed</h1>
      <div className="search-container">
        <input
          type="text"
          id="search-bar"
          className="search-bar"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button id="search-button" className="search-button" onClick={handleSearch}>
          ⌕
        </button>
      </div>
      <button
        className="donate-button"
        onClick={() => window.open("https://www.buymeacoffee.com/anish29801", "_blank")}
      >
        Donate Now
      </button>
    </div>
  );
};

export default Navbar;
