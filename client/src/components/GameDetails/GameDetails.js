/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LoadingFrame from '../LoadingFrame/LoadingFrame'
import './GameDetails.css';

const GameDetails = () => {
  const [gameInfo, setGameInfo] = useState([]);
  const [gameStatus, setGameStatus] = useState();

  const { id } = useParams();

  const user = useSelector(state => state.user);
  const username = user.userData.username;

  const getGameStatus = async (username, gameId) => {
    const urlDev = 'http://localhost:8080';
    const url = 'https://gamehub-userserver.herokuapp.com';
    const status = await axios.post(`${urlDev}/user/game-status`, { username, gameId });
    return status;
  }
  
  const getGameInfo = async gameId => {
    const urlDev = 'http://localhost:4000';
    const url = 'https://gamehub-gameserver.herokuapp.com';
    // const data = await axios.get(`${urlDev}/api/game/${gameId}`);
    // setGameInfo(data.data);
    const status = await getGameStatus(username, gameId);
    if (!status.data) {
      return;
    }
    setGameStatus(status.data);
  }
  
  const handleClick = async e => {
    e.preventDefault();
    setGameStatus(e.target.id);
    const urlDev = 'http://localhost:8080';
    const url = 'https://gamehub-userserver.herokuapp.com';
    await axios.put(`${urlDev}/user/addgame`, {
      username,
      gameId: id,
      gameName: "Skyrim", //CHANGE THIS
      status: e.target.id,
    })
  }

  useEffect(() => {
    getGameInfo(id);
  }, [])

  const createMarkup = () => {
    return {__html: gameInfo[0].description}
  }

  return (
    <div className="page-content__game-container">
      {/* {gameInfo.length === 0 && <LoadingFrame />} */}
      {gameInfo.length > 0 && (
        <>
          <img className="game-container__image" src={gameInfo[2] ? gameInfo[2].image : gameInfo[0].background} alt={gameInfo[0].name}/>
          <div className="game-container__details">
            <h2 className="details__name">{gameInfo[0].name}</h2>
            <div className="details__info" id="description" dangerouslySetInnerHTML={createMarkup()} />
            <p className="details__info">Release date: {gameInfo[0].year}</p>
            <p className="details__info">Platforms: {gameInfo[0].platforms}</p>
            <p className="details__info">Genres: {gameInfo[0].genres}</p>
            <p className="details__info">Main Story: {gameInfo[1] && gameInfo[1].gameplayMain}h</p>
            <p className="details__info">Main Story + Extras: {gameInfo[1] && gameInfo[1].gameplayMainExtra}h</p>
            <p className="details__info">Completionist: {gameInfo[1] && gameInfo[1].gameplayCompletionist}h</p>
          </div>
        </>
      )}
      {gameInfo.length === 0 && (
        <>
          { user.userData.username &&
          <div className="game-container__button-container">
            <button className={`button-container__mark-button ${gameStatus === "played" ? "selected" : "not-selected"}`} id="played" onClick={handleClick}>Played</button>
            <button className={`button-container__mark-button ${gameStatus === "playing" ? "selected" : "not-selected"}`} id="playing" onClick={handleClick}>Playing</button>
            <button className={`button-container__mark-button ${gameStatus === "wish" ? "selected" : "not-selected"}`} id="wish" onClick={handleClick}>Will play</button>
          </div>
          }
          <img className="game-container__image" src="https://i1.sndcdn.com/artworks-000026688925-b992wq-t500x500.jpg" alt="Skyrim"/>
          <div className="game-container__details">
            <h2 className="details__name">Skyrim</h2>
            <p className="details__info" id="description">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
            <p className="details__info">Release date: 2008</p>
            <p className="details__info">Platforms: PS4PC</p>
            <p className="details__info">Genres: RPG</p>
            <p className="details__info">Main Story: 40h</p>
            <p className="details__info">Main Story + Extras: 130h</p>
            <p className="details__info">Completionist: 200h</p>
            <p className="details__info">Rating: 4.8</p>
          </div>
        </>
      )}
    </div>
  );
};

export default GameDetails;
