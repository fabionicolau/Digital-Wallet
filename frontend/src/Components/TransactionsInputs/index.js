import React, { useState, useContext } from 'react';
import TransactionsContext from '../../Context/TransactionsContext/context';

function TransactionsInputs() {
  const [username, setUsername] = useState('');
  const [value, setValue] = useState('');
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
    setUpdateTransactions(data);
  };

  return (
    <div>
      <h1>Transação Financeira</h1>
      <form>
        <label htmlFor="username">
          Usuário:
          <input
            type="text"
            id="username"
            name="username"
            value={ username }
            onChange={ (event) => setUsername(event.target.value) }
          />
        </label>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            id="value"
            name="value"
            min="0"
            value={ value }
            onChange={ (event) => setValue(event.target.value) }
          />
        </label>
        <button
          type="button"
          onClick={ handleSubmit }
        >
          Enviar
        </button>
      </form>
      {errorMessage && (
        <div>
          <p>{ errorMessage }</p>
        </div>
      )}
    </div>
  );
}

export default TransactionsInputs;
