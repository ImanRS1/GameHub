import React, { useState, useEffect } from 'react';
import BurgerItem from '../BurgerItem/BurgerItem';
import axios from 'axios';
import './Burger.css';

const Burger = () => {
  const [isMounted, setMounted] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [genres, setGenres] = useState([]);

  const toggleBurger = () =>{
    setMounted(true);
    setBurgerOpen(!burgerOpen);
    setDisplayMenu(!displayMenu);
  };

  const fetchGenres = async () => {
    const urlDev = 'http://localhost:4000';
    const url = 'https://gamehub-gameserver.herokuapp.com';

    const data = await axios.get(`${urlDev}/api/genres`);
    setGenres(data.data);
  };

  useEffect(() => {
    fetchGenres();
  }, [])

  return (
    <div className="page-header__burger">
      <div className="burger__burger-icon" onClick={toggleBurger}>
        <div className={`burger-icon__button ${isMounted && `${burgerOpen ? "active" : "not-active"}`}`} >
          <span className="button__line"></span>
          <span className="button__line"></span>
          <span className="button__line"></span>
        </div>
      </div>
      <div className={`burger__menu ${!isMounted && "hidden"} ${displayMenu ? "show" : "hide"}`}>
        <h2 className="menu__title">Categories</h2>
        <ul className="menu__list">
          {genres.map(genre => <BurgerItem key={genre.name} genre={genre} />)}
        </ul>
      </div>
    </div>
  );
};

export default Burger;
