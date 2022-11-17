import React from 'react';
import LoginProvider from './context/loginContext/provider';
import RegisterProvider from './context/registerContext/provider';
import ProductsProvider from './context/productsContext/provider';
import CheckoutProvider from './context/checkoutContext/provider';
import AppRoutes from './routes/routes';

function App() {
  return (
    <LoginProvider>
      <RegisterProvider>
        <ProductsProvider>
          <CheckoutProvider>
            <AppRoutes />
          </CheckoutProvider>
        </ProductsProvider>
      </RegisterProvider>
    </LoginProvider>
  );
}

export default App;
