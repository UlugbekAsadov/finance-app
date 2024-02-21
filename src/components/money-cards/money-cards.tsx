import { MoneyCard } from "./money-card/money-card";
import { ReactComponent as ChevronUpRoundedIcon } from "../../assets/icons/chevron-up-rounded.svg";
import { ReactComponent as ChevronDownRoundedIcon } from "../../assets/icons/chevron-down-rounded.svg";
import { ReactComponent as CurrencyIcon } from "../../assets/icons/currency.svg";
import { ITransactionData } from "../../utils/interfaces/transaction-actions.interface";
import { currencyFormatter } from "../../utils/helper/currency-formatter";

import "./money-cards.css";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsDataQueryFn } from "../../react-query/queries/transactions.query";
export const MoneyCards = () => {
  const { data, isLoading } = useQuery<ITransactionData>({
    queryKey: ["transactions-data"],
    queryFn: () => getTransactionsDataQueryFn(),
  });

  const { income = 0, outcome = 0 } = data || {};

  return (
    <div className="container">
      <div className="money__cards">
        <MoneyCard
          type="income"
          icon={<ChevronUpRoundedIcon />}
          price={income}
          isLoading={isLoading}
        />
        <MoneyCard
          type="outcome"
          icon={<ChevronDownRoundedIcon />}
          price={outcome}
          isLoading={isLoading}
        />
        <MoneyCard
          type="total"
          icon={<CurrencyIcon />}
          price={income - outcome}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
