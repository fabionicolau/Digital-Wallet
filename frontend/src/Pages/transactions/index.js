import React from 'react';

import Header from '../../Components/Header';
import TransactionsTable from '../../Components/TransactionsTable';
import TransactionsInputs from '../../Components/TransactionsInputs';

function Transactions() {
  return (
    <div>
      <Header />
      <TransactionsInputs />
      <TransactionsTable />
    </div>
  );
}

export default Transactions;
