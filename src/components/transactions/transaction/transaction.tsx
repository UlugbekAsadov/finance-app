import { ITransactionResponse } from "../../../utils/interfaces/transaction-actions.interface";
import { currencyFormatter } from "../../../utils/helper/currency-formatter";
import { formatTimestamp } from "../../../utils/helper/timestamp-formatter";
import { ETransactionActions } from "../../../utils/enums/transaction-actions.enum";
import { useModalContext } from "../../../context/modal-context/modal.context";
import { TransactionActions } from "../../header/transaction-actions/transaction-actions";

import "./transaction.css";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
interface IProps {
  transaction: ITransactionResponse;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
}
export const Transaction = ({ transaction, refetch }: IProps) => {
  const { title, timestamp, price, action, id, comment } = transaction;
  const isIncome = action === ETransactionActions.Income;
  const { openModal } = useModalContext();

  const { fullDate } = formatTimestamp(timestamp);

  const openEditModal = () => {
    const transactionForm = { ...transaction };
    openModal({
      id: "transaction-edit",
      component: <TransactionActions transaction={transaction} refetch={refetch} />,
    });
  };
  return (
    <div className="transaction__inline" key={id} onClick={openEditModal}>
      <p className="transaction__title">{title}</p>
      <p className="transaction__comment">{comment}</p>
      <p className={`transaction__price ${isIncome ? "income" : "outcome"}`}>
        {isIncome ? "+" : "-"}
        {currencyFormatter(parseInt(price))}
      </p>
      <p className="transaction__date">{fullDate}</p>
    </div>
  );
};
