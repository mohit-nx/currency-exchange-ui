import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';

import { GET_CURRENCY_LIST, GET_EXCHANGE_RATES } from './queries';
import './App.css';

function App() {
  const [getExchangeRates, { loading: gerLoading, data: gerData }] = useLazyQuery(GET_EXCHANGE_RATES);
  const [currency, setCurrency] = useState('INR');

  const { loading, data, error } = useQuery(GET_CURRENCY_LIST, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    getExchangeRates({
      variables: {
        base: currency,
      }
    })
  }, [currency])

  if (loading) return <p>Loading ...</p>;

  const getCurrencyOptions = () => {
    if (data && data.currencyList) {
      return data.currencyList.map(element =>
        <option key={element.code} value={element.code}>{element.name}</option>
      )
    }
    return;
  }

  const displayExchangeRates = () => {
    if (gerData && gerData.exchangeRate) {
      return Object.entries(gerData.exchangeRate.rates).map(([key, value]) =>
        <tr key={key}>
          <td> 1 {currency}</td>
          <td> {key} </td>
          <td> {value} </td>
        </tr>
      )
    }
  }

  return (
    <div className="App">
      <label>Choose a Currency:</label>
      <select defaultValue="INR" onChange={(e) => setCurrency(e.target.value)} id="currency">
        {getCurrencyOptions()}
      </select>
      <table>
        <thead>
          <tr>
            <th>Base</th>
            <th>Currency</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {gerLoading ? <tr><td colSpan={3}>Loading</td></tr>: displayExchangeRates()}
        </tbody>
      </table>
    </div>
  );
}

export default App;
