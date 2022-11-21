import React, { useState, useContext } from 'react';
import TransactionsContext from '../../Context/TransactionsContext/context';

function FilterInputs() {
  const [date, setDate] = useState('');
  const [cashInOrOut, setCashInOrOut] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setTransactions } = useContext(TransactionsContext);

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
      return setErrorMessage(data.message);
    }
  };

  return (
    <div>
      <h1>FilterInputs</h1>
      <form>
        <label htmlFor="date">
          Data:
          <input
            type="date"
            id="date"
            name="date"
            value={ date }
            onChange={ (event) => setDate(event.target.value) }
          />
        </label>
        <label htmlFor="cashInOrOut">
          Tipo de transação:
          <select
            name="cashInOrOut"
            id="cashInOrOut"
            onChange={ (event) => setCashInOrOut(event.target.value) }
          >
            <option value="" defaultValue="">-Escolha uma opção-</option>
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
      </form>
      {errorMessage && (
        <div>
          <p>{ errorMessage }</p>
        </div>
      )}
    </div>
  );
}

export default FilterInputs;
