/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StarRating from 'react-svg-star-rating';
import axios from 'axios';
import './ProfileGame.css';

const ProfileGame = ({ game }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const user = useSelector(state => state.user);
  const username = user.userData.username;

  const handleLoad = async () => {
    const userRating = game.ratings.filter(rating => rating.user === username)[0];
    if(!userRating) {
      return;
    }
    const gameRating = userRating.rating;
    setRating(gameRating);
  };

  const handleOnClick = async rating => {
    const urlDev = 'http://localhost:4123';
    // const url = 'https://gamehub-gameserver.herokuapp.com';
    setRating(rating);
    await axios.put(`${urlDev}/api/game/${game.id}`, { rating, id: game.id, username: username });
  };

  const handleClick = e => {
    e.preventDefault();
    navigate(`/game/${game.id}`);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="games__main-container">
      <div className="main-container__left" onClick={handleClick}>
        <img className="left__image" src={game.background} alt={game.name} />
      </div>
      <div className="main-container__right">
        <h3 className="right__title">{game.name}</h3>
        <StarRating handleOnClick={handleOnClick} activeColor="#ffffff" emptyColor="#292929" hoverColor="#ffffff" starClassName="right__star" initialRating={rating} />
      </div>
    </div>
  );
};

export default ProfileGame;
