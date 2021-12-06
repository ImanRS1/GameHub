import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/UserSlice';

import './SignUp.css';

const SignUp = () => {
  const [passMatch, setPassMatch] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    const password = e.target.children[2].children[0].value;
    const confirmPassword = e.target.children[3].children[0].value;

    if (password !== confirmPassword) {
      return setPassMatch(false);
    }

    const newUser = {
      username: e.target.children[0].children[0].value,
      email: e.target.children[1].children[0].value,
      password: e.target.children[2].children[0].value
    };

    const urlDev = 'http://localhost:8080';
    const url = 'https://gamehub-userserver.herokuapp.com';

    const data = await axios.post(`${urlDev}/users/join`, newUser);

    const user = {
      username: data.data.username,
      avatar: data.data.avatar,
    }

    dispatch(
      setUser({
        user,
        accessToken: data.data.accessToken,
      })
    );

    navigate(`/profile/${data.data.username}`);
  };

  return (
    <>
      <h2 className="page-content__join-title">Sign Up</h2>
      <form className="page-content__join-form" onSubmit={handleSubmit}>
        <label className="join-form__label">
          Username
          <input className="join-form__input" type="text" placeholder="Username" required />
        </label>
        <label className="join-form__label">
          Email
          <input className="join-form__input" type="email" placeholder="example@email.com" required />
        </label>
        <label className="join-form__label">
          Password
          <input className="join-form__input" type="password" placeholder="Password" required />
        </label>
        <label className="join-form__label">
          Confirm Password
          <input className="join-form__input" type="password" placeholder="Confirm Password" required />
        </label>
        <p className={ passMatch ? "hidden" : "error" }>Sorry, your passwords don't match!</p>
        <button className="join-form__button" type="submit">Sign Up</button>
      </form>
      <p className="page-content__sign-in">Already a member? <Link className="sign-in__link" to='/login'>Login</Link></p>
    </>
  );
};

export default SignUp;
