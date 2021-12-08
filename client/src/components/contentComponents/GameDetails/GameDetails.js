/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Review from '../Review/Review';
import axios from 'axios';
import StarRating from 'react-svg-star-rating';
import ReviewForm from '../ReviewForm/ReviewForm';
import LoadingAnimation from '../../LoadingAnimation/LoadingAnimation';
import './GameDetails.css';

const GameDetails = () => {
  const [gameInfo, setGameInfo] = useState();
  const [gameStatus, setGameStatus] = useState();
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();

  const user = useSelector(state => state.user);
  const username = user.userData.username;

  const getGameStatus = async (username, gameId) => {
    // const urlDev = 'http://localhost:8123';
    const url = 'https://gamehub-userserver.herokuapp.com';
    if (!username) {
      return;
    }
    const status = await axios.post(`${url}/user/game-status`, { username, gameId });
    return status;
  }
  
  const getGameInfo = async gameId => {
    // const urlDev = 'http://localhost:4123';
    const url = 'https://gamehub-gameserver.herokuapp.com';
    const data = await axios.get(`${url}/api/game/${gameId}`);
    data.data.reviews = data.data.reviews.reverse();
    setGameInfo(data.data);
    const status = await getGameStatus(username, gameId);
    if (!status || !status.data) {
      return;
    }
    setGameStatus(status.data);
  };
  
  const handleClick = async e => {
    e.preventDefault();
    setGameStatus(e.target.id);
    // const urlDev = 'http://localhost:8123';
    const url = 'https://gamehub-userserver.herokuapp.com';
    await axios.put(`${url}/user/addgame`, {
      username,
      gameId: id,
      gameName: gameInfo.name, 
      status: e.target.id,
    })
  };

  useEffect(() => {
    getGameInfo(id);
  }, [showForm]);

  const createMarkup = () => {
    const gameDesc = gameInfo.description;
    const newDesc = gameDesc.replaceAll("<br />", "<p><p/>");
    return {__html: newDesc}
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
  
  const toggleShow = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="page-content__game-container">
      {!gameInfo ? 
      <div className="page-content__loader">
      <LoadingAnimation />
      </div>
      : (
        <>
          {username && (
          <div className="game-container__button-container">
            <button className={`button-container__mark-button ${gameStatus === "played" ? "selected" : "not-selected"}`} id="played" onClick={handleClick}>Played</button>
            <button className={`button-container__mark-button ${gameStatus === "playing" ? "selected" : "not-selected"}`} id="playing" onClick={handleClick}>Playing</button>
            <button className={`button-container__mark-button ${gameStatus === "wish" ? "selected" : "not-selected"}`} id="wish" onClick={handleClick}>Will play</button>
          </div>
          )}
          <img className="game-container__image" src={gameInfo.image ? gameInfo.image : gameInfo.background} alt={gameInfo.name}/>
          <div className="game-container__details">
            <h2 className="details__name">{gameInfo.name}</h2>
            <div className="details__info" id="description" dangerouslySetInnerHTML={createMarkup()} />
            <p className="details__info release">Release date: {gameInfo.year}</p>
            <p className="details__info">Platforms: {gameInfo.platforms.join(', ')}</p>
            <p className="details__info">Genres: {gameInfo.genres.join(', ')}</p>
            { gameInfo.gameplayMain && gameInfo.gameplayMain !== 0 ?
            <p className="details__info">Main Story: {gameInfo.gameplayMain}h</p>
            : "" }
            { gameInfo.gameplayMainExtra && gameInfo.gameplayMainExtra !== 0 ?
            <p className="details__info">Main Story + Extras: {gameInfo.gameplayMainExtra}h</p>
            : "" }
            { gameInfo.gameplayCompletionist && gameInfo.gameplayCompletionist !== 0 ?
            <p className="details__info">Completionist: {gameInfo.gameplayCompletionist}h</p>
            : "" }
            {!isNaN(getRating()) && (
            <div className="rating">
              <p>Rating:</p>
              <StarRating activeColor="#ffffff" emptyColor="#292929" hoverColor="#ffffff" starClassName="right__star" initialRating={getRating()} isReadOnly={true} />  
            </div>
            )}
          </div>
        </>
      )}
      { gameInfo && (
        <div className="game-container__game-reviews">
          <h3 className="game-reviews__title">Game reviews</h3>
          { username &&
          <>
            <button className="game-reviews__button" onClick={toggleShow}>Add review</button>
            <div className={showForm ? "" : "hidden"}>
              <ReviewForm id={id} user={username} toggle={toggleShow} />
            </div>
          </>
          }
          {
            gameInfo.reviews.length > 0 ? 
            gameInfo.reviews.map(review => <Review key={Math.random()} review={review} rating={gameInfo.ratings.find(rating => rating.user === review.user)} />) : <p>No reviews yet...</p>
          }
        </div>
      )}
    </div>
  );
};

export default GameDetails;
