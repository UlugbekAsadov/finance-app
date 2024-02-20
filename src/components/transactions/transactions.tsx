import { useApi } from "../../hooks/useApi/useApi";
import { ITransactionResponse } from "../../utils/interfaces/transaction-actions.interface";
import { Transaction } from "./transaction/transaction";

import "./transactions.css";
export const Transactions = () => {
  const { data } = useApi<ITransactionResponse[]>("transactions", "/transactions");

  if (!data?.length) {
    return null;
  }

  const transactionsList = data.map((transaction) => (
    <Transaction {...transaction} key={transaction.id} />
  ));
  return (
    <div className="container">
      <div className="transactions__list">{transactionsList}</div>;
    </div>
  );
};
