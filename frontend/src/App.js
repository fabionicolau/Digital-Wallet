import React from 'react';
import AppRoutes from './Routes';
import FormInputsContext from './Context/FormInputsContext/provider';
import TransactionsProvider from './Context/TransactionsContext/provider';
import GlobalStyles from './styles/global';

function App() {
  return (
    <TransactionsProvider>
      <FormInputsContext>
        <GlobalStyles />
        <AppRoutes />
      </FormInputsContext>
    </TransactionsProvider>
  );
}

export default App;
