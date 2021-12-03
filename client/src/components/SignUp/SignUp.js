import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {

  const handleSubmit = async e => {
    e.preventDefault();

    // Confirm password check missing

    const newUser = {
      username: e.target.children[0].children[0].value,
      email: e.target.children[1].children[0].value,
      password: e.target.children[2].children[0].value
    };
    
    await axios.post('http://localhost:5000/users/join', newUser);
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
        <button className="join-form__button" type="submit">Sign Up</button>
      </form>
      <p className="page-content__sign-in">Already a member? <Link className="sign-in__link" to='/login'>Login</Link></p>
    </>
  );
};

export default SignUp;
