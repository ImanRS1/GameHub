import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../images/logo.png';
import './GameDisplay.css';

const GameDisplay = ({ game }) => {
  const navigate = useNavigate();
  
  const handleClick = async e => {
    e.preventDefault();
    navigate(`/game/${game.id}`);
  }

  return (
    <div className="results__display" onClick={handleClick}>
      <img src={!game.background_image ? logoImage : game.background_image} alt={game.name} className="display__image" />
      <h3 className="display__name">{game.name}</h3>
    </div>
  );
};

export default GameDisplay
