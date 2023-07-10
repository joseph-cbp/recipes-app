import { useState } from 'react';
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

  return (
    <div className="content-login">
      <form
        onSubmit={ (e) => handleSubmit(e) }
      >
        <h1>LOGIN</h1>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Email"
          name="email"
          onChange={ (e) => handleChangeInput(e) }
        />

        <input
          type="text"
          data-testid="password-input"
          placeholder="Senha"
          name="password"
          onChange={ (e) => handleChangeInput(e) }
        />

        <button
          data-testid="login-submit-btn"
          disabled={
            !/.{7,}/.test(loginData.password)
            || !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(loginData.email)
          }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
