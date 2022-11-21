import React, { useContext, useEffect } from 'react';
import TransactionsContext from '../../Context/TransactionsContext/context';

function Transactions() {
  const { transactions, setTransactions,
    updateTransactions } = useContext(TransactionsContext);

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

  // const formatDate = (date) => {
  //   const newDate = new Date(date);
  //   const day = newDate.getDate() + 1;
  //   const month = newDate.getMonth() + 1;
  //   const year = newDate.getFullYear();
  //   return `${day}/${month}/${year}`;
  //   // return newDate.toLocaleDateString('pt-br');
  // };

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
