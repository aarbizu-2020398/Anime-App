import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAnime from '../hooks/useAnime';
import SearchBar from './SearchBar';
import AnimeCard from './AnimeCard';

const AnimeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10; // Número de animes por página
  const { animes, loading, error, total } = useAnime(searchTerm, page, pageSize);

  useEffect(() => {
    setPage(1); // Reset page to 1 when search term changes
  }, [searchTerm]);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Buscador de Anime</h1>
      <SearchBar onSearch={handleSearch} />
      
      <div className="row">
        {animes.length > 0 ? (
          animes.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))
        ) : (
          <p className="text-center">No se encontraron resultados.</p>
        )}
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <li key={pageNumber} className={`page-item ${pageNumber === page ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AnimeList;
