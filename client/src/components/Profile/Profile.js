/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';

const Profile = () => {
  const user = useSelector(state => state.user);

  return (
    <div>
      <div>
        <img src="" />
      </div>
      <div>
        <h2>{user.userData.username}</h2>
      </div>
    </div>
  );
};

export default Profile;
