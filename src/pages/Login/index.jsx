import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import getLocalStorage from '../../utils/localStorage';

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

  const isPasswordValid = loginData.password.length > 6;
  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(loginData.email);
  const disabled = !(isPasswordValid && isEmailValid);

  return (
    <div data-testid="content-login">
      <form className="login-form" onSubmit={ handleSubmit }>
        <h1>LOGIN</h1>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Email"
          name="email"
          onChange={ handleChangeInput }
        />

        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          name="password"
          onChange={ handleChangeInput }
        />

        <button data-testid="login-submit-btn" disabled={ disabled }>
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
