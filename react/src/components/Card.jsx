import React from 'react';
import './styles/Card.css';
import { Link } from 'react-router-dom';

const Card = ({ objPersonajes }) => {
  const { nombreSH, nombreReal, biografia, imgURL } = objPersonajes;

  // Manejo de URLs de imágenes
  const imageURL = imgURL?.split(',')[0]; 

  return (
    <div className="card-body">
      <Link to={`/detail/${nombreSH}`} className="card-link">
        <div className="card">
          <img src={imageURL} alt={nombreSH} className="card-image" />
          <div className="card-content">
            <h3>{nombreSH}</h3>
            <h4>Actor: {nombreReal}</h4>
            <p>{biografia}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
