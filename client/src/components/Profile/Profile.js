/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';

const Profile = () => {
  const user = useSelector(state => console.log('state', state.user));

  return (
    <div>
      You are in!
    </div>
  );
};

export default Profile;
