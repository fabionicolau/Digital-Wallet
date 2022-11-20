import React from 'react';
import AppRoutes from './Routes';
import LoginProvider from './Context/provider';

function App() {
  return (
    <LoginProvider>
      <AppRoutes />
    </LoginProvider>
  );
}

export default App;
