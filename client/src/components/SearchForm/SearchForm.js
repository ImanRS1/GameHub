import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faGamepad, faUser } from '@fortawesome/free-solid-svg-icons';
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
    e.target.reset();
    dispatch(
      setSearchQuery(query)
    );
    if (selected === "games") {
      const urlDev = 'http://localhost:4123';
      // const url = 'https://gamehub-gameserver.herokuapp.com';
      const data = await axios.get(`${urlDev}/api/games/${query}`);
      dispatch(
        setSearchResults(data.data)
      );
      return navigate(`/results/${query}`);
    }
    navigate(`/users/${query}`);
  };

  const handleClick = e => {
    e.preventDefault();
    setSelected(e.target.closest("div").id);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className={`search-bar__change-button ${selected === "games" ? "selected" : "not-selected"}`} onClick={handleClick} id="games">
        <FontAwesomeIcon icon={faGamepad} className="change-button__icon" />
      </div>
      <div className={`search-bar__change-button ${selected === "users" ? "selected" : "not-selected"}`} onClick={handleClick} id="users">
        <FontAwesomeIcon icon={faUser} className="change-button__icon" />
      </div>
      <input type="text" className="search-bar__input-field" placeholder="Search..." onChange={handleChange} />
      <button type="submit" className="search-bar__submit-button">
        <FontAwesomeIcon icon={faSearch} className="submit-button__icon" />
      </button>
    </form>
  );
};

export default SearchForm;
