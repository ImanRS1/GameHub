import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setSearchResults } from '../../slices/SearchSlice';
import './SearchForm.css';

const SearchForm = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const [selected, setSelected] = useState("games");
  const navigate = useNavigate();

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(
      setSearchQuery(query)
    );
    e.target.reset();
    const urlDev = 'http://localhost:4000';
    const url = 'https://gamehub-gameserver.herokuapp.com';
    const data = await axios.get(`${urlDev}/api/games/${query}`);
    dispatch(
      setSearchResults(data.data)
    );
    navigate(`/results/${query}`);
  };

  const handleClick = e => {
    e.preventDefault();
    setSelected(e.target.closest("button").id);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input type="text" className="search-bar__input-field" placeholder="Search for something..." onChange={handleChange} />
      <button className={`search-bar__change-button ${selected === "games" ? "selected" : "not-selected"}`} onClick={handleClick} id="games">
        <FontAwesomeIcon icon={faGamepad} className="change-button__icon" />
      </button>
      <button className={`search-bar__change-button ${selected === "users" ? "selected" : "not-selected"}`} onClick={handleClick} id="users">
        <FontAwesomeIcon icon={faUser} className="change-button__icon" />
      </button>
    </form>
  );
};

export default SearchForm;
