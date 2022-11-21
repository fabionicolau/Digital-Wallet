import React from 'react';
import Header from '../../Components/Header';
import TransactionsTable from '../../Components/TransactionsTable';
import TransactionsInputs from '../../Components/TransactionsInputs';
import FilterInputs from '../../Components/FilterInputs';

function Transactions() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return 'Usuário não encontrado';

  return (
    <div>
      <Header />
      <TransactionsInputs />
      <FilterInputs />
      <TransactionsTable />
    </div>
  );
}

export default Transactions;
