import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AnimeCard = ({ anime, onClick }) => {
  const { titles, posterImage, episodeCount } = anime.attributes;

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img
          src={posterImage.small}
          className="card-img-top"
          alt={titles.en_jp || titles.ja_jp}
        />
        <div className="card-body">
          <h5 className="card-title">{titles.en_jp || titles.ja_jp}</h5>
          <p className="card-text">
            Episodios: {episodeCount || "Desconocido"}
          </p>
          <button className="btn btn-primary" onClick={() => onClick(anime)}>
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
