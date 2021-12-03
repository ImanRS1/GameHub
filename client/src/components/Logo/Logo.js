import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../images/logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="page-header__logo-container">
      <Link to="/" className="page-header__logo-link">
        <img className="logo-container__logo-image" src={logoImage} alt="GameHub logo" />
        <h1 className="logo-container__logo-title">GameHub</h1>
      </Link>
    </div>
  );
};

export default Logo;
