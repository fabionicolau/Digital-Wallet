/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import FormInputsContext from '../../Context/FormInputsContext/context';
import * as S from './style';

function FormInputs({ page }) {
  const { username, setUsername,
    userPassword, setUserPassword } = useContext(FormInputsContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const endpoint = page === 'login' ? 'login' : 'register';

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

  async function handleLoginSubmit(event) {
    event.preventDefault();
    const request = await fetch(`http://localhost:3001/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.toUpperCase(), password: userPassword }),
    });
    const response = await request.json();

    if (!response?.id) {
      return setErrorMessage(response.message);
    }

    localStorage.setItem('user', JSON.stringify(response));
    return navigate('/transactions');
  }

  return (
    <S.Form>
      <div>
        <S.Container>

          <h1>DW</h1>

          <input
            id="username-input"
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={ username }
            onChange={ (event) => { setUsername(event.target.value); } }
          />
          <input
            id="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            value={ userPassword }
            onChange={ (event) => { setUserPassword(event.target.value); } }
          />
          {errorMessage && (
            <div>
              <p className="error">{ errorMessage }</p>
            </div>
          )}
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ handleLoginSubmit }
          >
            { page === 'login' ? 'Entrar' : 'Cadastrar' }
          </button>

          { page === 'login' && (
            <button
              type="button"
              onClick={ () => {
                navigate('/register');
                setUserPassword('');
                setUsername('');
              } }
            >
              Ainda não tenho conta
            </button>
          ) }
        </S.Container>
      </div>
    </S.Form>
  );
}

FormInputs.propTypes = {
  page: Proptypes.string,
}.isRequired;

export default FormInputs;
