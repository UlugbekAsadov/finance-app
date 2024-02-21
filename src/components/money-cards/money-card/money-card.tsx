import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TMoneyCardType } from "../../../utils/types/money-card.type";
import { currencyFormatter } from "../../../utils/helper/currency-formatter";

import "./money-card.css";

interface IProps {
  type: TMoneyCardType;
  icon: ReactNode;
  price: string | number;
  isLoading?: boolean;
  disableLink?: boolean;
}

export const MoneyCard = ({ type, icon, price, isLoading, disableLink }: IProps) => {
  const isTypeTotal = type === "total";

  return (
    <div data-testid="money-card-total" className={`money__card ${isTypeTotal ? "total" : ""}`}>
      <div className="money__card-header">
        <p className="money__card-type">{type}</p>
        {icon}
      </div>
      <div className="money__cards-footer">
        <p className={`money__card-money  ${isLoading ? "loading" : ""}`}>
          {currencyFormatter(price)}
        </p>
        {disableLink || isTypeTotal ? null : (
          <Link className="money__card-link" to={`/statistics/${type}`}>
            Full details
          </Link>
        )}
      </div>
    </div>
  );
};
