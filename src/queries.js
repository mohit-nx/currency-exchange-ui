import { gql } from '@apollo/client';

const GET_CURRENCY_LIST = gql`
  query {
    currencyList {
      code
      name
    }
  }
`

const GET_EXCHANGE_RATES = gql`
  query GetExchangeRate($base: String!) {
    exchangeRate(base: $base) {
      base
      date
      rates
    }
  }
`

export {
  GET_CURRENCY_LIST,
  GET_EXCHANGE_RATES,
}