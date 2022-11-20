import React, { useState, useMemo } from 'react';
import propTypes from 'prop-types';

import TransactionsContext from './context';

function TransacionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [cashInOrOut, setCashInOrOut] = useState('');
  const [date, setDate] = useState('');

  const memo = useMemo(
    () => ({
      transactions,
      cashInOrOut,
      date,
      setTransactions,
      setCashInOrOut,
      setDate,
    }),
    [transactions, cashInOrOut, date],
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
