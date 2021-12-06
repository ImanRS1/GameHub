import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Results from './components/Results/Results';
import GameDetails from './components/GameDetails/GameDetails';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import PublicProfile from './components/PublicProfile/PublicProfile';
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
