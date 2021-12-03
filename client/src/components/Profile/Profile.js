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

  return (
    <div className="page-content__profile">
      <div className="profile__avatar">
      { user.userData.avatar ? 
            <img src={user.userData.avatar} alt={user.userData.username} className="profile__image" />
          :
            <FontAwesomeIcon icon={faUserCircle} className="profile__icon" /> } 
      </div>
      <div className="profile__info">
        <h2 className="info_username">{user.userData.username}</h2>
        <p className="info_details">52 games played</p>
        <p className="info_details">75 reviews written</p>
        <p className="info_details">Change password</p>
        <p className="info_details" onClick={handleLogout}>Logout (just refresh!)</p>
      </div>
    </div>
  );
};

export default Profile;
