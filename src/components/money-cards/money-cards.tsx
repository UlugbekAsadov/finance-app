import { MoneyCard } from "./money-card/money-card";
import { ReactComponent as ChevronUpRoundedIcon } from "../../assets/icons/chevron-up-rounded.svg";
import { ReactComponent as ChevronDownRoundedIcon } from "../../assets/icons/chevron-down-rounded.svg";
import { ReactComponent as CurrencyIcon } from "../../assets/icons/currency.svg";

import "./money-cards.css";
import { useApi } from "../../hooks/useApi/useApi";
import { ITransactionStatus } from "../../utils/interfaces/transaction-actions.interface";
import { currencyFormatter } from "../../utils/helper/currency-formatter";
export const MoneyCards = () => {
  const { data, isLoading } = useApi<ITransactionStatus>("/data");

  return (
    <div className="container">
      <div className="money__cards">
        <MoneyCard
          type="Outcome"
          icon={<ChevronUpRoundedIcon />}
          price={currencyFormatter(data?.income || 0)}
          isLoading={isLoading}
        />
        <MoneyCard
          type="Income"
          icon={<ChevronDownRoundedIcon />}
          price={currencyFormatter(data?.outcome || 0)}
          isLoading={isLoading}
        />
        <MoneyCard
          type="Total"
          icon={<CurrencyIcon />}
          price={currencyFormatter(data?.total || 0)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
