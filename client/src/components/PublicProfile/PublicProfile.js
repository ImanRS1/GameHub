import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './PublicProfile.css';

const PublicProfile = () => {

  const [userData, setUserData] = useState({});

  const { name } = useParams();

  const urlDev = 'http://localhost:5000';
  const url = 'https://gamehub-userserver.herokuapp.com';
  
  const getData = async () => {
    const data = await axios.get(`${urlDev}/users/${name}`);
    setUserData(data.data[0]);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="page-content__profile">
      <div className="profile__avatar">
      { userData.avatar ? 
            <img src={userData.avatar} alt={userData.username} className="profile__image" />
          :
            <FontAwesomeIcon icon={faUserCircle} className="profile__icon" /> } 
      </div>
      <div className="profile__info">
        <h2 className="info__username">{userData.username}</h2>
        <p className="info__details">52 games played</p>
        <p className="info__details">75 reviews written</p>
      </div>
    </div>
  );
};

export default PublicProfile;
