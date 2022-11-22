import React, { useState, useContext } from 'react';
import TransactionsContext from '../../Context/TransactionsContext/context';
import * as S from './style';

function FilterInputs() {
  const [date, setDate] = useState('');
  const [cashInOrOut, setCashInOrOut] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setTransactions, setTransactionNotFound } = useContext(TransactionsContext);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3001/transaction/search?date=${date}&transaction=${cashInOrOut}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token,
      },
    });
    const data = await response.json();
    setTransactions(data);

    if (!data[0]?.id) {
      setTransactionNotFound(true);
      return setErrorMessage(data.message);
    }
    setErrorMessage('');
    setTransactionNotFound(false);
  };

  return (
    <div>
      <S.TitleP>
        <h2>Filtrar</h2>
      </S.TitleP>
      <S.TransferContainer>
        <label htmlFor="date">
          <input
            type="date"
            id="date"
            name="date"
            value={ date }
            onChange={ (event) => setDate(event.target.value) }
          />
        </label>
        <label htmlFor="cashInOrOut">
          <select
            name="cashInOrOut"
            id="cashInOrOut"
            onChange={ (event) => setCashInOrOut(event.target.value) }
          >
            <option value="" defaultValue="">Todas</option>
            <option value="cashin">Recebimento</option>
            <option value="cashout">Pagamento</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ handleSubmit }
        >
          Filtrar
        </button>
      </S.TransferContainer>
      {errorMessage && (
        <div>
          <p align="center">{ errorMessage }</p>
        </div>
      )}
    </div>
  );
}

export default FilterInputs;
