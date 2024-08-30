/* SearchBar.jsx */
import React, { useState } from 'react';

const SearchBar = ({ onCitySearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onCitySearch(city);
  };

  return (
    <div className="search-bar">
      
      <input
        type="text"
        placeholder="Enter ANY city name around the World!"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;