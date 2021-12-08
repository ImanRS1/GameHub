/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import StarRating from 'react-svg-star-rating';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Review.css'

const Review = ({ review, rating }) => {
  const [userAvatar, setUserAvatar] = useState();
  const navigate = useNavigate();
  
  const handleLoad = async () => {
    // const urlDev = 'http://localhost:8123';
    const url = 'https://gamehub-userserver.herokuapp.com';
    const data = await axios.get(`${url}/users/${review.user}`);
    setUserAvatar(data.data[0].avatar);
  };

  const handleClick = e => {
    e.preventDefault();
    navigate(`/users/${review.user}`);
  }

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="review-container">
      <div className="review__avatar" onClick={handleClick}>
        { userAvatar ? 
          <img src={userAvatar} alt={review.user} className="review__image picture" />
          :
          <FontAwesomeIcon icon={faUserCircle} className="review__icon picture" />
        } 
      </div>
      <div className="review__right-side">
        <div className="right-side__top-info">
          <h3>{review.user}</h3>
          { rating &&
          <StarRating activeColor="#ffffff" emptyColor="#292929" hoverColor="#ffffff" starClassName="reviews__star" initialRating={rating.rating} isReadOnly={true} size="20" />
          }
        </div>
        <p>{review.review}</p>
      </div>
    </div>
  )
}

export default Review
