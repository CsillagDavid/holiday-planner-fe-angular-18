import { Currency } from "./currency.model";
import { Exchange } from "./exchange.model";

export interface LookupData {
    currencies: Currency[],
    exchanges: Exchange[]
}