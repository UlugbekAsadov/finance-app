import { ITransactionResponse } from "../../utils/interfaces/transaction-actions.interface";
import { Transaction } from "./transaction/transaction";

import "./transactions.css";
import { useQuery } from "@tanstack/react-query";
import { getAllTransactionQueryFn } from "../../react-query/queries/transactions.query";
export const Transactions = () => {
  const { data } = useQuery<ITransactionResponse[]>({
    queryKey: ["all-transactions"],
    queryFn: () => getAllTransactionQueryFn(),
  });

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
