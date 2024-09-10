// components/SearchBar.jsx

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="d-flex mb-4">
      <input
        type="text"
        className="form-control me-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar anime por nombre o categoría"
      />
      <button className="btn btn-outline-primary" type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;
