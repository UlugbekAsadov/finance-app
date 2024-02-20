import { MoneyCard } from "./money-card/money-card";
import { ReactComponent as ChevronUpRoundedIcon } from "../../assets/icons/chevron-up-rounded.svg";
import { ReactComponent as ChevronDownRoundedIcon } from "../../assets/icons/chevron-down-rounded.svg";
import { ReactComponent as CurrencyIcon } from "../../assets/icons/currency.svg";
import { useApi } from "../../hooks/useApi/useApi";
import { ITransactionStatus } from "../../utils/interfaces/transaction-actions.interface";
import { currencyFormatter } from "../../utils/helper/currency-formatter";

import "./money-cards.css";
export const MoneyCards = () => {
  const { data, isLoading } = useApi<ITransactionStatus>("data", "/data");
  const { income, outcome } = data || {};

  return (
    <div className="container">
      <div className="money__cards">
        <MoneyCard
          type="Outcome"
          icon={<ChevronUpRoundedIcon />}
          price={currencyFormatter(outcome || 0)}
          isLoading={isLoading}
        />
        <MoneyCard
          type="Income"
          icon={<ChevronDownRoundedIcon />}
          price={currencyFormatter(income || 0)}
          isLoading={isLoading}
        />
        <MoneyCard
          type="Total"
          icon={<CurrencyIcon />}
          price={currencyFormatter(parseInt(income as string) - parseInt(outcome as string))}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
