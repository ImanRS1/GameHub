import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import './UserButton.css';

const UserButton = () => {
  const user = useSelector(state => state.user);
  return (
    <button className="page-header__user-button">
     { user.accessToken ? 
        <Link to={`/profile/${user.userData.username}`}>
          { user.userData.avatar ? 
            <img src={user.userData.avatar} alt={user.userData.username} className="user-button__image" />
          :
            <FontAwesomeIcon icon={faUserCircle} className="user-button__icon" /> } 
        </Link> 
        : 
        <Link to="/login">
          <FontAwesomeIcon icon={faSignInAlt} className="user-button__icon" />
        </Link> }
    </button>
  );
};

export default UserButton;
