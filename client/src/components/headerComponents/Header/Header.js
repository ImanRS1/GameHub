import React from 'react';
import Logo from '../Logo/Logo';
import Burger from '../Burger/Burger';
import UserButton from '../UserButton/UserButton';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

const Header = () => {
  return (
    <header className="page-header">
      <nav className="page-header__nav">
        <Burger />
        <Logo />
        <UserButton />
      </nav>
      <div className="page-header__search">
        <SearchForm />
      </div>
    </header>
  );
};

export default Header;
