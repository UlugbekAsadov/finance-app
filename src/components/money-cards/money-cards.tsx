import { MoneyCard } from "./money-card/money-card";
import { ReactComponent as ChevronUpRoundedIcon } from "../../assets/icons/chevron-up-rounded.svg";
import { ReactComponent as ChevronDownRoundedIcon } from "../../assets/icons/chevron-down-rounded.svg";
import { ReactComponent as CurrencyIcon } from "../../assets/icons/currency.svg";

import "./money-cards.css";
export const MoneyCards = () => {
  return (
    <div className="container">
      <div className="money__cards">
        <MoneyCard type="Outcome" icon={<ChevronUpRoundedIcon />} price="2,342,534" />
        <MoneyCard type="Income" icon={<ChevronDownRoundedIcon />} price="2,342,534" />
        <MoneyCard type="Total" icon={<CurrencyIcon />} price="2,342,534" />
      </div>
    </div>
  );
};
