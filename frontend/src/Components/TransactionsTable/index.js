/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect } from 'react';
import TransactionsContext from '../../Context/TransactionsContext/context';
import * as S from './style';

function Transactions() {
  const { transactions, setTransactions,
    updateTransactions, transactionNotFound } = useContext(TransactionsContext);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchTransactions = async () => {
      const request = await fetch('http://localhost:3001/transaction', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      });
      const response = await request.json();
      setTransactions(response);
    };
    fetchTransactions();
  }, [setTransactions, updateTransactions, user.token]);

  if (transactionNotFound) return '';
  return (
    <div>
      <S.Title>
        <h2>Transações</h2>
      </S.Title>
      <div>
        <S.Table>
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
                <S.Td>{transaction.createdAt}</S.Td>
                <S.Td>{transaction.debitedUserName}</S.Td>
                <S.Td>{transaction.creditedUserName}</S.Td>
                <S.valueTd
                  className="value"
                  username={ user.username }
                  credited={ transaction.creditedUserName }
                >
                  {transaction.value}

                </S.valueTd>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </div>
    </div>
  );
}

export default Transactions;
