import React from 'react'

const CurrencyTable = props => {
  const currencies = Object.values(props.Currencies); 
  
  return (
  <table>
    <thead>
      <tr>
        <th>Currency</th>
        <th>Base</th>
        <th>Rate</th>
        <th>Last Update</th>
      </tr>
    </thead>
    <tbody>
      {currencies.length > 0 ? (
        currencies.map(currency => (
          <tr key={currency.id}>
            <td>{currency.name}</td>
            <td>{currency.base}</td>
            <td>{currency.rate}</td>
            <td>{currency.time}</td>
            <td>
              <button
                onClick={() => props.deleteCurrency(currency)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No Currencies</td>
        </tr>
      )}
    </tbody>
  </table>
)}

export default CurrencyTable