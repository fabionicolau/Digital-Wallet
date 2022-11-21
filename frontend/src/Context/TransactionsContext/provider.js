import React, { useState, useMemo } from 'react';
import propTypes from 'prop-types';

import TransactionsContext from './context';

function TransacionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [updateTransactions, setUpdateTransactions] = useState('');
  const [transactionNotFound, setTransactionNotFound] = useState(false);

  const memo = useMemo(
    () => ({
      transactions,
      updateTransactions,
      transactionNotFound,
      setTransactions,
      setUpdateTransactions,
      setTransactionNotFound,
    }),
    [transactionNotFound, transactions, updateTransactions],
  );

  return (
    <TransactionsContext.Provider value={ memo }>
      {children}
    </TransactionsContext.Provider>
  );
}

TransacionsProvider.propTypes = {
  children: propTypes.node,
}.isRequired;

export default TransacionsProvider;
