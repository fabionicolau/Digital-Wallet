import React from 'react';
import AppRoutes from './Routes';
import FormInputsContext from './Context/FormInputsContext/provider';
import TransactionsProvider from './Context/TransactionsContext/provider';

function App() {
  return (
    <TransactionsProvider>
      <FormInputsContext>
        <AppRoutes />
      </FormInputsContext>
    </TransactionsProvider>
  );
}

export default App;
