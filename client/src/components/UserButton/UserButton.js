import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import './UserButton.css';

const UserButton = () => {
  const user = useSelector(state => state.user);
  console.log(user);
  return (
    <button className="page-header__user-button">
     { user.accessToken ? 
        <Link to={`/profile/${user.userData.username}`}>
          { user.userData.avatar ? 
            <FontAwesomeIcon icon={faUserCircle} className="user-button__icon" />
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
