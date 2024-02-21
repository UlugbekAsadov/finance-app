import { ITransactionResponse } from "../../utils/interfaces/transaction-actions.interface";
import { Transaction } from "./transaction/transaction";

import "./transactions.css";

interface IProps {
  transactions: ITransactionResponse[];
  title: string;
}
export const Transactions = ({ transactions, title }: IProps) => {
  if (!transactions?.length) {
    return null;
  }

  const transactionsList = transactions.map((transaction) => (
    <Transaction {...transaction} key={transaction.id} />
  ));

  return (
    <div className="container">
      <h2 className="transactions__title">{title}</h2>
      <div className="transactions__list">{transactionsList}</div>;
    </div>
  );
};
