// components/AnimeCard.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AnimeCard = ({ anime }) => {
  const { titles, posterImage, episodeCount, averageRating, subtype } = anime.attributes;

  return (
    <div className="col-md-3 mb-4"> {/* Cambiado a col-md-3 para más animes por fila */}
      <div className="card h-100">
        <img
          src={posterImage.medium} // Usa una imagen más pequeña
          className="card-img-top"
          alt={titles.en_jp || titles.ja_jp}
        />
        <div className="card-body">
          <h5 className="card-title">{titles.en_jp || titles.ja_jp}</h5>
          <p className="card-text">
            {episodeCount} episodios - Tipo: {subtype}
          </p>
          {averageRating && <p className="card-text">Rating: {averageRating}</p>}
        </div>
        <div className="card-footer">
          <button className="btn btn-primary">Ver Anime</button>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
