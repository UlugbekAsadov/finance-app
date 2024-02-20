import { ReactNode } from "react";

import "./money-card.css";

interface IProps {
  type: "Income" | "Outcome" | "Total";
  icon: ReactNode;
  price: string;
}

export const MoneyCard = ({ type, icon, price }: IProps) => {
  const isTypeTotal = type === "Total";

  return (
    <div data-testid="money-card-total" className={`money__card ${isTypeTotal ? "total" : ""}`}>
      <div className="money__card-header">
        <p className="money__card-type">{type}</p>
        {icon}
      </div>
      <p className="money__card-money">{price} UZS</p>
    </div>
  );
};
