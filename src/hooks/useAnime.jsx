import { useState, useEffect } from 'react';
import { fetchAnimeCategory, fetchAnimeDetail } from '../services/anime'; // Asegúrate de que la ruta sea correcta

const useAnime = (searchTerm, page, pageSize) => {
  const [animes, setAnimes] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null); // Nuevo estado para el anime seleccionado
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);
      try {
        const data = await fetchAnimeCategory(searchTerm, page, pageSize);
        setAnimes(data.animes);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, [searchTerm, page, pageSize]);

  const getAnimeDetails = async (animeId) => {
    setLoading(true);
    try {
      const data = await fetchAnimeDetail(animeId);
      setSelectedAnime(data);
    } catch (err) {
      setError('Error al cargar los detalles del anime.');
    } finally {
      setLoading(false);
    }
  };

  return { animes, selectedAnime, getAnimeDetails, loading, error, total };
};

export default useAnime;
