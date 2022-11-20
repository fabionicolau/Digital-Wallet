import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginContext from '../../Context/context';

function Login() {
  const { username, setUsername, userPassword, setUserPassword,
  } = useContext(loginContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isUsernameInValid, setIsUsernameInValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const validateCredentials = () => {
      const passwordRegex = /(?=.*[A-Z])(?=.*\d)/g;
      const MIN_PASSWORD_LEN = 7;
      const MIN_USERNAME_LEN = 2;

      if (passwordRegex.test(userPassword)
      && userPassword.length > MIN_PASSWORD_LEN
      && username.length > MIN_USERNAME_LEN) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    validateCredentials();
  }, [username, userPassword]);

  async function handleSubmit(event) {
    event.preventDefault();
    const request = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password: userPassword }),
    });
    const response = await request.json();

    if (response.message === 'Incorrect username or password') {
      return setIsUsernameInValid(true);
    }

    localStorage.setItem('user', JSON.stringify(response));
    setIsUsernameInValid(false);

    return navigate('/transactions');
  }

  return (
    <form className="loginForm">
      <h3 className="titleLogin">Login</h3>

      <div className="container">
        <label htmlFor="username-input">
          Nome de usuário
          <input
            id="username-input"
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={ username }
            onChange={ (event) => { setUsername(event.target.value); } }
            className="inputForm"
          />
        </label>

        <label htmlFor="password-input">
          Senha
          <input
            id="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            value={ userPassword }
            onChange={ (event) => { setUserPassword(event.target.value); } }
            className="inputForm"
          />
        </label>
        { isUsernameInValid
      && <p>Nome de usuário ou senha inválidos</p> }

        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ handleSubmit }
          className="loginPageButton"
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={ () => { navigate('/register'); } }
          className="loginPageButton"
        >
          Ainda não tenho conta
        </button>
      </div>
    </form>
  );
}

export default Login;
