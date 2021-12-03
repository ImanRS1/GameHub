import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../../slices/SearchSlice';
import './BurgerItem.css';

const BurgerItem = ({ genre }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    const url = process.env.USER_SERVER_PATH ? process.env.GAME_SERVER_PATH : 'http://localhost:4000';

    const data = await axios.get(`${url}/api/genre/${genre.id}`);
    return data.data;
  }

  const handleClick = async e => {
    e.preventDefault();
    const games = await getData();
    dispatch(
      setSearchResults(games)
    );
    navigate(`/category/${genre.name}`)
  }
  
  return (
    <li className="genre-list" onClick={handleClick}>
        <p className="genre-list__info">{genre.name}</p>
        <img className="genre-list__image" src={genre.image} alt={genre.name} />
    </li>
  );
};

export default BurgerItem;
