import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setSearchResults } from '../../slices/SearchSlice';
import './SearchForm.css';

const SearchForm = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
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
    const data = await axios.get(`${url}/api/games/${query}`);
    dispatch(
      setSearchResults(data.data)
    );
    navigate(`/results/${query}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <button type="submit" className="search-bar__submit-button">
        <FontAwesomeIcon icon={faSearch} className="submit-button__icon" />
      </button>
      <input type="text" className="search-bar__input-field" placeholder="Search game..." onChange={handleChange} />
    </form>
  );
};

export default SearchForm;
