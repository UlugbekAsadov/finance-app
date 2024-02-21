import { ITransactionResponse } from "../../utils/interfaces/transaction-actions.interface";
import { Transaction } from "./transaction/transaction";

import "./transactions.css";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface IProps {
  transactions: ITransactionResponse[];
  title: string;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
}
export const Transactions = ({ transactions, title, refetch }: IProps) => {
  if (!transactions?.length) {
    return null;
  }

  const transactionsList = transactions.map((transaction) => (
    <Transaction transaction={transaction} key={transaction.id} refetch={refetch} />
  ));

  return (
    <div className="container">
      <h2 className="transactions__title">{title}</h2>
      <div className="transactions__list">{transactionsList}</div>;
    </div>
  );
};
