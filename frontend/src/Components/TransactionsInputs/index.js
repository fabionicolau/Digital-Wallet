/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import TransactionsContext from '../../Context/TransactionsContext/context';
import * as S from './style';

function TransactionsInputs() {
  const [username, setUsername] = useState('');
  const [value, setValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUpdateTransactions } = useContext(TransactionsContext);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token,
      },
      body: JSON.stringify({
        username,
        value,
      }),
    });
    const data = await response.json();
    if (!data?.id) {
      return setErrorMessage(data.message);
    }
    setErrorMessage('');
    setUpdateTransactions(data);
  };

  return (
    <div>
      <S.TitleP>
        <h2>Transferência</h2>
      </S.TitleP>
      <S.TransferContainer>
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="usuário"
            value={ username }
            onChange={ (event) => setUsername(event.target.value) }
          />
        </label>
        <label htmlFor="value">
          <input
            type="number"
            id="value"
            name="value"
            min="0"
            value={ value }
            placeholder="valor"
            onChange={ (event) => setValue(event.target.value) }
          />
        </label>
        <button
          type="button"
          onClick={ handleSubmit }
        >
          Enviar
        </button>
      </S.TransferContainer>

      {errorMessage && (
        <S.TitleP>
          <p>{ errorMessage }</p>
        </S.TitleP>
      )}
    </div>
  );
}

export default TransactionsInputs;
