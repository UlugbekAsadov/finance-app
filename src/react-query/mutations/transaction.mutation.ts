import fetcher from "../../utils/helper/fetcher";
import {
  ITransactionData,
  ITransactionFormRequest,
} from "../../utils/interfaces/transaction-actions.interface";

export const updateTransactionsDataFn = (transactionData: Partial<ITransactionData>) =>
  fetcher(`/data`, {
    method: "PUT",
    body: JSON.stringify(transactionData),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });

export const createTransaction = (transaction: ITransactionFormRequest) =>
  fetcher(`/transactions`, {
    method: "POST",
    body: JSON.stringify(transaction),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
