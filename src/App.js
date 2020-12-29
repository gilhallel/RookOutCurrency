import React, { useState, Fragment } from "react";
import { createContext, useContext, useEffect } from "react";
import AddCurrencyForm from "./forms/AddCurrencyForm";
import CurrencyTable from "./tables/CurrencyTable";
// import PostList from './fetchUtils/PostList'

const CurrenciesContext = createContext({
  currencies: [],
  addCurrency: () => {},
  deleteCurrency: () => {},
}); // value = ['USD']

export function CurrenciesProvider(props) {
  const [currenciesSymbols, setCurrenciesSymbol] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const addCurrency = (symbol) => {
    setCurrenciesSymbol([...currenciesSymbols, symbol]);
  };

  const deleteCurrency = (symbol) => {
    const currenciesAfterFilter = currenciesSymbols.filter(
      (current) =>
        current?.base !== symbol?.base && current?.name !== symbol?.name
    );
    setCurrenciesSymbol(currenciesAfterFilter);
  };

  useEffect(() => {
    let initial = false;
    setInterval(() => {
      setRefetch(!initial);
      initial;
    }, 5000);
  }, []);

  useEffect(() => {
    (async () => {
      const updatedCurrencies = [];
      for (const symbol of currenciesSymbols) {
        // fetch whatever
        const wepApiRes = await fetch(
          `https://api.exchangeratesapi.io/latest?symbols=${symbol.name}&base=${symbol.base}`
        );
        const data = await wepApiRes.json();

        updatedCurrencies.push({
          name: symbol.name,
          base: symbol.base,
          rate: data.rates[symbol.name],
          time: symbol.rate !==data.rates[symbol.name]? Date().toLocaleString() : symbol.time 


        });
      }
      setCurrencies(updatedCurrencies);
    })();
  }, [currenciesSymbols, setCurrencies, refetch]);

  return (
    <CurrenciesContext.Provider
      value={{
        currencies,
        addCurrency,
        deleteCurrency,
      }}
    >
      {props.children}
    </CurrenciesContext.Provider>
  );
}

export function useCurrencies() {
  return useContext(CurrenciesContext).currencies;
}

export function useCurrencyManager() {
  const context = useContext(CurrenciesContext);

  return {
    addCurrency: context.addCurrency,
    deleteCurrency: context.deleteCurrency,
  };
}

const Container = () => {
  const initialFormState = { id: null, name: "", base: "", rate: "" };
  const currencies = useCurrencies();
  const { addCurrency, deleteCurrency } = useCurrencyManager();

  return (
    <>
      <div className="container">
        <h1>CRUD App with Hooks</h1>
        <div className="flex-row">
          <div className="flex-large">
            {
              <Fragment>
                <h2>Add currency</h2>
                <AddCurrencyForm addCurrency={addCurrency} />
              </Fragment>
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

function App() {
  return (
    <CurrenciesProvider>
      <Container />
    </CurrenciesProvider>
  );
}

export default App;
