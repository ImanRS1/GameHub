/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import StarRating from 'react-svg-star-rating';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Review.css'

const Review = ({ review, rating }) => {
  const [userAvatar, setUserAvatar] = useState();
  
  const handleLoad = async () => {
    const urlDev = 'http://localhost:8123';
    // const url = 'https://gamehub-userserver.herokuapp.com';
    const data = await axios.get(`${urlDev}/users/${review.user}`);
    setUserAvatar(data.data[0].avatar);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      { userAvatar ? 
        <img src={userAvatar} alt={review.user} className="profile__image" />
        :
        <FontAwesomeIcon icon={faUserCircle} className="profile__icon" />
      } 
      <h3>{review.user}</h3>
        <StarRating activeColor="#ffffff" emptyColor="#292929" hoverColor="#ffffff" starClassName="right__star" initialRating={rating.rating} isReadOnly={true} />
      <p>{review.review}</p>
    </div>
  )
}

export default Review
