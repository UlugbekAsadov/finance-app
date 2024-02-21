import { ITransactionResponse } from "../../utils/interfaces/transaction-actions.interface";
import { Transaction } from "./transaction/transaction";

import "./transactions.css";

interface IProps {
  transactions: ITransactionResponse[];
}
export const Transactions = ({ transactions }: IProps) => {
  if (!transactions?.length) {
    return null;
  }

  const transactionsList = transactions.map((transaction) => (
    <Transaction {...transaction} key={transaction.id} />
  ));

  return (
    <div className="container">
      <div className="transactions__list">{transactionsList}</div>;
    </div>
  );
};
