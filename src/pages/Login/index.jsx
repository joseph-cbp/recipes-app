import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import getLocalStorage from '../../utils/localStorage';
import './Login.css';
import Logo from '../../components/Logo';
import tomate from '../../images/tomate.png';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    getLocalStorage.setItem('user', { email: loginData.email });

    history.push('/meals');
  };

  const handleChangeInput = ({ target: { name, value } }) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const isPasswordValid = /.{7,}/.test(loginData.password);
  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(loginData.email);
  const disabled = !(isPasswordValid && isEmailValid);

  return (
    <div data-testid="content-login" className="login">
      <header className="login-header">
        <Logo full />
        <div className="login-header-tomate">
          <img
            src={ tomate }
            alt="tomate cortado com salada"
          />
        </div>
      </header>
      <form className="login-form" onSubmit={ handleSubmit }>
        <h1>LOGIN</h1>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Email"
          name="email"
          className="form-control"
          onChange={ handleChangeInput }
        />

        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          name="password"
          className="form-control"
          onChange={ handleChangeInput }
        />
        <button
          data-testid="login-submit-btn"
          className="btn btn-primary"
          disabled={ disabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
