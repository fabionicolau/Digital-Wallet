import React, { useContext, useEffect } from 'react';
import TransactionsContext from '../../Context/TransactionsContext/context';

function Transactions() {
  const { transactions, setTransactions } = useContext(TransactionsContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      const request = await fetch('http://localhost:3001/transaction', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      });
      const response = await request.json();
      setTransactions(response);
    };
    fetchTransactions();
  }, [setTransactions]);

  // const formatDate = (date) => {
  //   const date = newDate(date);
  // }

  return (
    <div>
      <h1>Transactions</h1>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Pagou</th>
            <th>Recebeu</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 && transactions.map((transaction) => (
            <tr key={ transaction.id }>
              <td>{transaction.id}</td>
              <td>{transaction.debitedUserName}</td>
              <td>{transaction.creditedUserName}</td>
              <td>{transaction.value}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
