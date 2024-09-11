// src/components/AnimeDetail.jsx

import React, { useEffect, useState } from 'react';
import { fetchAnimeDetail } from '../services/anime'; // Verifica la ruta

const AnimeDetail = ({ animeId, onClose }) => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await fetchAnimeDetail(animeId);
        setAnime(data);
      } catch (err) {
        setError('Error al cargar la información del anime.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [animeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-4" onClick={onClose}>Volver</button>
      {anime && (
        <div className="card">
          <img src={anime.attributes.posterImage.small} className="card-img-top" alt={anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp} />
          <div className="card-body">
            <h5 className="card-title">{anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp}</h5>
            <p className="card-text">{anime.attributes.description}</p>
            <h6>Episodes:</h6>
            <ul>
              {/* Suponiendo que 'episodes' es una lista de episodios, ajusta según la estructura real de datos */}
              {anime.attributes.episodeCount && <li>Episode Count: {anime.attributes.episodeCount}</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDetail;
