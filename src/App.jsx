import React from "react";
import { CurrenciesProvider } from './contexts/CurrenciesContext';
import ExchangeMenu from './exchangeMenu';

function App() {
  return (
    <CurrenciesProvider>
      <ExchangeMenu />
    </CurrenciesProvider>
  );
}

export default App;
