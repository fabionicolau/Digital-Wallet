import React from 'react';
import AppRoutes from './Routes';
import FormInputsContext from './Context/FormInputsContext/provider';

function App() {
  return (
    <FormInputsContext>
      <AppRoutes />
    </FormInputsContext>
  );
}

export default App;
