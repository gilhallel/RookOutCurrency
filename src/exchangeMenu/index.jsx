import React from "react";
import {
  useCurrencies,
  useCurrencyManager,
} from "../contexts/CurrenciesContext";
import AddCurrencyForm from './AddCurrencyForm';
import CurrencyTable from './CurrencyTable';

const Container = () => {
  const currencies = useCurrencies();
  const { addCurrency, deleteCurrency } = useCurrencyManager();

  return (
    <>
      <div className="container">
        <h1>CRUD App with Hooks</h1>
        <div className="flex-row">
          <div className="flex-large">
            {
              <>
                <h2>Add currency</h2>
                <AddCurrencyForm addCurrency={addCurrency} />
              </>
            }
          </div>
          <div className="flex-large">
            <h2>View Currencies</h2>
            <CurrencyTable
              Currencies={currencies}
              deleteCurrency={deleteCurrency}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
