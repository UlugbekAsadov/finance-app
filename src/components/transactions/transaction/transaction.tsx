import { ITransactionResponse } from "../../../utils/interfaces/transaction-actions.interface";
import { currencyFormatter } from "../../../utils/helper/currency-formatter";
import { formatTimestamp } from "../../../utils/helper/timestamp-formatter";
import { ETransactionActions } from "../../../utils/enums/transaction-actions.enum";

import "./transaction.css";
export const Transaction = ({
  title,
  timestamp,
  price,
  action,
  id,
  comment,
}: ITransactionResponse) => {
  const isIncome = action === ETransactionActions.Income;

  return (
    <div className="transaction__inline" key={id}>
      <p className="transaction__title">{title}</p>
      <p className="transaction__comment">{comment}</p>
      <p className={`transaction__price ${isIncome ? "income" : "outcome"}`}>
        {isIncome ? "+" : "-"}
        {currencyFormatter(parseInt(price))}
      </p>
      <p className="transaction__date">{formatTimestamp(timestamp)}</p>
    </div>
  );
};
