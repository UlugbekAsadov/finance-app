import { ReactNode } from "react";
import { Link } from "react-router-dom";

import "./money-card.css";

interface IProps {
  type: "Income" | "Outcome" | "Total";
  icon: ReactNode;
  price: string;
  isLoading?: boolean;
}

export const MoneyCard = ({ type, icon, price, isLoading }: IProps) => {
  const isTypeTotal = type === "Total";

  return (
    <div data-testid="money-card-total" className={`money__card ${isTypeTotal ? "total" : ""}`}>
      <div className="money__card-header">
        <p className="money__card-type">{type}</p>
        {icon}
      </div>
      <div className="money__cards-footer">
        <p className={`money__card-money  ${isLoading ? "loading" : ""}`}>{price}</p>
        <Link className="money__card-link" to={`/statistics?type=${type}`}>
          Full details
        </Link>
      </div>
    </div>
  );
};
