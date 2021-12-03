/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { name } = useParams();

  const handleLoad = async () => {
    const userData = await axios.get(`http://localhost:5000/users/${name}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('Token')}`
      }
    });
  };

  useEffect(() => {
    handleLoad()
  }, []);

  return (
    <div>
      IGOT HERE
    </div>
  );
};

export default Profile;
