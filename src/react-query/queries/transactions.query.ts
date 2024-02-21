import fetcher from "../../utils/helper/fetcher";
import { TMoneyCardType } from "../../utils/types/money-card.type";

export const getTransactionsDataQueryFn = () =>
  fetcher("/data")
    .then((res) => res.json())
    .then((res) => res);

export const getAllTransactionQueryFn = (filter?: TMoneyCardType) =>
  fetcher(`/transactions?_sort=-timestamp${filter ? `&action=${filter?.toUpperCase()}` : ""}`)
    .then((res) => res.json())
    .then((res) => res);
