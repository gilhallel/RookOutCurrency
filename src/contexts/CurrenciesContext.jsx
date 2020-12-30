import React, { useState, useEffect, createContext, useContext } from "react";

const CurrenciesContext = createContext({
  currencies: [],
  addCurrency: () => {},
  deleteCurrency: () => {},
});

export function CurrenciesProvider(props) {
  const [currenciesSymbols, setCurrenciesSymbol] = useState(
    JSON.parse(sessionStorage.getItem("autosave")) || []
  );
  const [currencies, setCurrencies] = useState({});
  const [refetch, setRefetch] = useState(false);

  const fetchCurrency = async (symbol) => {
    const response = await fetch(
      `https://api.exchangeratesapi.io/latest?symbols=${symbol.name}&base=${symbol.base}`
    );
    if (response.ok) {
      return response;
    }
    throw response;
  };

  const addCurrency = (symbol) => {
    const existingCurrency = currenciesSymbols.find(
      (current) =>
        current?.base == symbol?.base && current?.name == symbol?.name
    );
    if (existingCurrency) {
      window.alert("Currency already exists");
    } else {
      setCurrenciesSymbol([...currenciesSymbols, symbol]);
    }
  };

  const deleteCurrency = (symbol) => {
    const currenciesAfterFilter = currenciesSymbols.filter(
      (current) =>
        current?.base !== symbol?.base || current?.name !== symbol?.name
    );
    setCurrenciesSymbol(currenciesAfterFilter);
  };

  useEffect(() => {
    let initial = false;
    setInterval(() => {
      setRefetch(!initial);
      initial = !initial;
    }, 5000);
  }, [setRefetch]);

  useEffect(() => {
    (async () => {
      const updatedCurrencies = [];
      for (const symbol of currenciesSymbols) {
        const wepApiRes = await fetchCurrency(symbol).catch(function (err) {
          if (err?.status === 400) {
            deleteCurrency(symbol);
            window.alert("Unsupported currency");
          } else {
            window.alert("Unknown error occured");
          }
        });

        if (!wepApiRes) return;

        const data = await wepApiRes.json();
        const key = `${symbol.name}-${symbol.base}`;

        updatedCurrencies[key] = {
          id: key,
          name: symbol.name,
          base: symbol.base,
          rate: data.rates[symbol.name],
          time:
            currencies[key]?.rate !== data.rates[symbol.name]
              ? Date().toLocaleString()
              : currencies[key].time,
        };
      }
      setCurrencies(updatedCurrencies);
    })();
  }, [currenciesSymbols, setCurrencies, refetch]);

  useEffect(() => {
    sessionStorage.setItem("autosave", JSON.stringify(currenciesSymbols));
  }, [currenciesSymbols]);

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
