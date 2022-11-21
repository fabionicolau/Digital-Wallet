/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import FormInputsContext from '../../Context/FormInputsContext/context';
import logo from '../../images/logo.png';
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
      body: JSON.stringify({ username, password: userPassword }),
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
      <S.ImgDiv>
        <img src={ logo } alt="logo da empresa" className="logo" />
      </S.ImgDiv>

      <S.TitleForm>
        { page === 'login' ? 'Login' : 'Cadastro' }
      </S.TitleForm>

      <S.Container className="container">
        <label htmlFor="username-input">
          Nome de usuário
          <S.InputForm
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
          <S.InputForm
            id="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            value={ userPassword }
            onChange={ (event) => { setUserPassword(event.target.value); } }
            className="inputForm"
          />
        </label>
        {errorMessage && (
          <div>
            <p>{ errorMessage }</p>
          </div>
        )}

        <S.ButtonForm
          type="submit"
          disabled={ isDisabled }
          onClick={ handleLoginSubmit }
          className="FormButton"
        >
          { page === 'login' ? 'Entrar' : 'Cadastrar' }
        </S.ButtonForm>

        { page === 'login' && (
          <S.ButtonForm
            type="button"
            onClick={ () => {
              navigate('/register');
              setUserPassword('');
              setUsername('');
            } }
            className="FormButton"
          >
            Ainda não tenho conta
          </S.ButtonForm>
        ) }
      </S.Container>
    </S.Form>
  );
}

FormInputs.propTypes = {
  page: Proptypes.string,
}.isRequired;

export default FormInputs;
