import fetcher from "../../utils/helper/fetcher";

export const getTransactionsDataQueryFn = () =>
  fetcher("/data")
    .then((res) => res.json())
    .then((res) => res);

export const getAllTransactionQueryFn = () =>
  fetcher("/transactions?_sort=-timestamp")
    .then((res) => res.json())
    .then((res) => res);
