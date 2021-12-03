import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './UserButton.css';

const UserButton = () => {
  return (
    <button className="page-header__user-button">
      <Link to="/login">
        <FontAwesomeIcon icon={faSignInAlt} className="user-button__icon" />
      </Link>
    </button>
  );
};

export default UserButton;
