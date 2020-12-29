import React from 'react'

const CurrencyTable = props => (
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
      {props.Currencies.length > 0 ? (
        props.Currencies.map(currency => (
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
)

export default CurrencyTable