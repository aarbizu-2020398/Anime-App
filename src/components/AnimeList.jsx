import React, { useState } from 'react';
import useAnime from '../hooks/useAnime';
import SearchBar from './SearchBar';
import AnimeCard from './AnimeCard';
import AnimeDetail from './AnimeDetail'; // Asegúrate de importar AnimeDetail
import 'bootstrap/dist/css/bootstrap.min.css';

const AnimeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedAnime, setSelectedAnime] = useState(null); // Estado para el anime seleccionado
  const pageSize = 12;
  const { animes, loading, error, total } = useAnime(searchTerm, page, pageSize);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setPage(1); // Resetear la página a 1 al buscar
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleViewDetails = (anime) => {
    setSelectedAnime(anime);
  };

  const handleCloseDetail = () => {
    setSelectedAnime(null);
  };

  const totalPages = Math.ceil(total / pageSize);
  const maxPageLinks = 5;
  const startPage = Math.max(1, page - Math.floor(maxPageLinks / 2));
  const endPage = Math.min(totalPages, startPage + maxPageLinks - 1);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />

      {selectedAnime ? (
        <AnimeDetail animeId={selectedAnime.id} onClose={handleCloseDetail} />
      ) : (
        <>
          <div className="row">
            {animes.length > 0 ? (
              animes.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} onClick={handleViewDetails} />
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
              {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
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
        </>
      )}
    </div>
  );
};

export default AnimeList;
