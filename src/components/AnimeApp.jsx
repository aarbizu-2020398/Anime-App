
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimeList from './AnimeList';
import SearchBar from './SearchBar';

function AnimeApp() {
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4"></h1>
      <AnimeList searchTerm={searchTerm} />
    </div>

  );
};

export default AnimeApp;
