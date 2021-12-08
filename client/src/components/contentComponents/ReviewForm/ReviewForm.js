import React from 'react';
import axios from 'axios';
import './ReviewForm.css';

const ReviewForm = ({ id, user, toggle }) => {
  const handleSubmit = async e => {
    // const urlDev = 'http://localhost:4123';
    const url = 'https://gamehub-gameserver.herokuapp.com';
    e.preventDefault();
    const review = e.target.children[0].value;
    await axios.put(`${url}/api/review/${id}`, { id, user, review });
    e.target.reset();
    toggle();
  };

  return (
    <form className="game-reviews__form" onSubmit={handleSubmit}>
      <textarea className="form__textfield" align="top" type="text" placeholder="Add your review" />
      <button type="submit" className="form__submit">Add</button>
    </form>
  );
};

export default ReviewForm;
