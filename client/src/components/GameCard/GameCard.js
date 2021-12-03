import React from 'react';
import logoImage from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  
  const handleClick = async e => {
    e.preventDefault();
    navigate(`/game/${game.id}`);
  }

  return (
    <div className="results__card" onClick={handleClick}>
      <img src={!game.background_image ? logoImage : game.background_image} alt={game.name} className="card__image" />
      <h3 className="card__name">{game.name}</h3>
    </div>
  );
};

export default GameCard;
