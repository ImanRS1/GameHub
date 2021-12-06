import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import GameDisplay from '../GameDisplay/GameDisplay'

const Home = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [topRatedGames, setTopRatedGames] = useState([]);
  
  const handleOnLoad = async () => {
    const urlDev = 'http://localhost:4000';
    const url = 'https://gamehub-gameserver.herokuapp.com';
    const data = await axios.get(`${urlDev}/api/home`);
    setPopularGames(data.data[0].results);
    setTopRatedGames(data.data[1].results);
  }

  useEffect( () => {
    handleOnLoad();
  }, []);
  
  return (
    <div className="page-content">
      <div className="page-content__slogan-container">
        <h2 className="slogan-container__slogan">All games.<br/>Your voices.<br/>One Platform.</h2>
      </div>
      <p className="page-content__info">Today's most popular games</p>
      <div className="page-content__trending-container">
        {popularGames.length > 0 && popularGames.map(game => <GameDisplay key={game.name} game={game} />)}
      </div>
      <p className="page-content__info">Top reviewed today</p>
      <div className="page-content__reviewed-container">
        {topRatedGames.length > 0 && topRatedGames.map(game => <GameDisplay key={game.name} game={game} />)}
      </div>
    </div>
  );
};

export default Home;
