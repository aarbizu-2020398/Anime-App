import { useState, useEffect } from 'react';
import { fetchAnimeCategory } from '../services/anime';

const useAnime = (searchTerm, page, pageSize) => {
  const [animes, setAnimes] = useState([]);
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

  return { animes, loading, error, total };
};

export default useAnime;
