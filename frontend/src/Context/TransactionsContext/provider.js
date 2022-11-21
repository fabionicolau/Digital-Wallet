import React, { useState, useMemo } from 'react';
import propTypes from 'prop-types';

import TransactionsContext from './context';

function TransacionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [updateTransactions, setUpdateTransactions] = useState('');

  const memo = useMemo(
    () => ({
      transactions,
      updateTransactions,
      setTransactions,
      setUpdateTransactions,
    }),
    [transactions, updateTransactions],
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
