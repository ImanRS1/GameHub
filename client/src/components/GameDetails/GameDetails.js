/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './GameDetails.css';

const GameDetails = () => {
  const [gameInfo, setGameInfo] = useState([]);

  const { id } = useParams();
  
  const getGameInfo = async gameId => {
    const data = await axios.get(`http://localhost:4000/api/game/${gameId}`);
    setGameInfo(data.data);
  }

  useEffect(() => {
    getGameInfo(id);
  }, [])

  console.log(gameInfo);

  const createMarkup = () => {
    return {__html: gameInfo[0].description}
  }

  return (
    <div className="page-content__game-container">
      {gameInfo.length === 0 && <p>Loading...</p>}
      {gameInfo.length > 0 && (
        <>
          <img className="game-container__image" src={gameInfo[2] ? gameInfo[2].image : gameInfo[0].background} alt={gameInfo[0].name}/>
          <div className="game-container__details">
            <h2 className="details__name">{gameInfo[0].name}</h2>
            <div className="details__info" id="description" dangerouslySetInnerHTML={createMarkup()} />
            <p className="details__info">Release date: {gameInfo[0].year}</p>
            <p className="details__info">Platforms: {gameInfo[0].platforms}</p>
            <p className="details__info">Genres: {gameInfo[0].genres}</p>
            {/* <p>{gameInfo[2].videos}</p> */}
            <p className="details__info">Main Story: {gameInfo[1] && gameInfo[1].gameplayMain}h</p>
            <p className="details__info">Main Story + Extras: {gameInfo[1] && gameInfo[1].gameplayMainExtra}h</p>
            <p className="details__info">Completionist: {gameInfo[1] && gameInfo[1].gameplayCompletionist}h</p>
          </div>
        </>
      
      
      
      
      )}
    </div>
  );
};

export default GameDetails;
