import { ITransactionResponse } from "../../../utils/interfaces/transaction-actions.interface";

import "./transaction.css";
import { currencyFormatter } from "../../../utils/helper/currency-formatter";
import { formatTimestamp } from "../../../utils/helper/timestamp-formatter";
import { ETransactionActions } from "../../../utils/enums/transaction-actions.enum";

export const Transaction = ({ title, timestamp, price, type, id }: ITransactionResponse) => {
  const isIncome = type === ETransactionActions.Income;

  return (
    <div className="transaction__inline" key={id}>
      <p className="transaction__title">{title}</p>
      <p className={`transaction__price ${isIncome ? "income" : "outcome"}`}>
        {isIncome ? "+" : "-"}
        {currencyFormatter(price)}
      </p>
      <p className="transaction__date">{formatTimestamp(timestamp)}</p>
    </div>
  );
};
