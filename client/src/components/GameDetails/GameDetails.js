/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StarRating from 'react-svg-star-rating';
import './GameDetails.css';

const GameDetails = () => {
  const [gameInfo, setGameInfo] = useState([]);
  const [gameStatus, setGameStatus] = useState();

  const { id } = useParams();

  const user = useSelector(state => state.user);
  const username = user.userData.username;

  const getGameStatus = async (username, gameId) => {
    const urlDev = 'http://localhost:8123';
    // const url = 'https://gamehub-userserver.herokuapp.com';
    const status = await axios.post(`${urlDev}/user/game-status`, { username, gameId });
    return status;
  }
  
  const getGameInfo = async gameId => {
    const urlDev = 'http://localhost:4123';
    // const url = 'https://gamehub-gameserver.herokuapp.com';
    const data = await axios.get(`${urlDev}/api/game/${gameId}`);
    setGameInfo(data.data);
    const status = await getGameStatus(username, gameId);
    if (!status.data) {
      return;
    }
    setGameStatus(status.data);
  };
  
  const handleClick = async e => {
    e.preventDefault();
    setGameStatus(e.target.id);
    const urlDev = 'http://localhost:8123';
    // const url = 'https://gamehub-userserver.herokuapp.com';
    await axios.put(`${urlDev}/user/addgame`, {
      username,
      gameId: id,
      gameName: gameInfo.name, 
      status: e.target.id,
    })
  };

  useEffect(() => {
    getGameInfo(id);
  }, []);

  const createMarkup = () => {
    return {__html: gameInfo.description}
  };

  const getRating = () => {
    if (!gameInfo.ratings) {
      return;
    }
    const ratings = gameInfo.ratings.map(rating => rating.rating);
    const ratingsSum = ratings.reduce((a, b) => a + b, 0);
    const rating = (ratingsSum / ratings.length);
    return rating;
  }

  return (
    <div className="page-content__game-container">
      {gameInfo && (
        <>
          <div className="game-container__button-container">
            <button className={`button-container__mark-button ${gameStatus === "played" ? "selected" : "not-selected"}`} id="played" onClick={handleClick}>Played</button>
            <button className={`button-container__mark-button ${gameStatus === "playing" ? "selected" : "not-selected"}`} id="playing" onClick={handleClick}>Playing</button>
            <button className={`button-container__mark-button ${gameStatus === "wish" ? "selected" : "not-selected"}`} id="wish" onClick={handleClick}>Will play</button>
          </div>
          <img className="game-container__image" src={gameInfo.image ? gameInfo.image : gameInfo.background} alt={gameInfo.name}/>
          <div className="game-container__details">
            <h2 className="details__name">{gameInfo.name}</h2>
            <div className="details__info" id="description" dangerouslySetInnerHTML={createMarkup()} />
            <p className="details__info">Release date: {gameInfo.year}</p>
            <p className="details__info">Platforms: {gameInfo.platforms}</p>
            <p className="details__info">Genres: {gameInfo.genres}</p>
            <p className="details__info">Main Story: {gameInfo.gameplayMain && gameInfo.gameplayMain}h</p>
            <p className="details__info">Main Story + Extras: {gameInfo.gameplayMainExtra && gameInfo.gameplayMainExtra}h</p>
            <p className="details__info">Completionist: {gameInfo.gameplayCompletionist && gameInfo.gameplayCompletionist}h</p>
            <p>Rating:
              <StarRating activeColor="#ffffff" emptyColor="#292929" hoverColor="#ffffff" starClassName="right__star" initialRating={getRating()} isReadOnly={true} />
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default GameDetails;
