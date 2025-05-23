import { Currency } from './currency.model';

export interface Exchange {
  id: number;
  currencyFrom: Currency;
  currencyTo: Currency;
  exchangeRate: number;
}