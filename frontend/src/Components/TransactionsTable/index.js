import React, { useContext, useEffect } from 'react';
import TransactionsContext from '../../Context/TransactionsContext/context';

function Transactions() {
  const { transactions, setTransactions,
    updateTransactions, transactionNotFound } = useContext(TransactionsContext);

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
  }, [setTransactions, updateTransactions]);

  if (transactionNotFound) return '';
  return (
    <div>
      <h1>Transactions</h1>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Pagador</th>
            <th>Recebedor</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 && transactions.map((transaction) => (
            <tr key={ transaction.id }>
              <td>{transaction.createdAt}</td>
              <td>{transaction.debitedUserName}</td>
              <td>{transaction.creditedUserName}</td>
              <td>{transaction.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
