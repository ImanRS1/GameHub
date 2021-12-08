import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/headerComponents/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/contentComponents/Home/Home';
import Results from './components/contentComponents/Results/Results';
import GameDetails from './components/contentComponents/GameDetails/GameDetails';
import Login from './components/contentComponents/Login/Login';
import SignUp from './components/contentComponents/SignUp/SignUp';
import Profile from './components/contentComponents/Profile/Profile';
import PublicProfile from './components/contentComponents/PublicProfile/PublicProfile';
import './App.css';

const App = () => {
  return (
    <div className="main-container">
      <div className="main-container__wrapper">
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results/:query" element={<Results />} />
            <Route path="/category/:query" element={<Results />} />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/profile/:name" element={<Profile />} />
            <Route path="/users/:name" element={<PublicProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
