/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../slices/UserSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import './Profile.css';

const Profile = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = e => {
    e.preventDefault();

    dispatch(
      setUser({
        user: {},
        accessToken: null,
      })
    );
    navigate('/');
  };

  const move = e => {
    e.preventDefault();
    navigate('/game/123');
  }

  return (
    <div className="page-content__profile">
      <div className="profile__avatar">
      { user.userData.avatar ? 
            <img src={user.userData.avatar} alt={user.userData.username} className="profile__image" />
          :
            <FontAwesomeIcon icon={faUserCircle} className="profile__icon" /> } 
      </div>
      <div className="profile__info">
        <h2 className="info__username">{user.userData.username}</h2>
        <p className="info__details">Games played: 52</p>
        <p className="info__details">Reviews written: 75</p>
        { user.accessToken &&
        <button className="info__logout" onClick={handleLogout}>Logout</button>
        }
        <button onClick={move}>Magic button</button>
      </div>
    </div>
  );
};

export default Profile;
