import React from "react";
import { render } from "@testing-library/react";
import { Transaction } from "./transaction";
import { ITransactionResponse } from "../../../utils/interfaces/transaction-actions.interface";
import { ETransactionActions } from "../../../utils/enums/transaction-actions.enum";

describe("Transaction Component", () => {
  test("renders transaction details for income", () => {
    const transaction: ITransactionResponse = {
      id: 1,
      title: "Salary",
      timestamp: 1708419643728,
      price: "2000",
      action: ETransactionActions.Income,
      comment: "comment",
    };

    const { getByText } = render(<Transaction {...transaction} />);
    const titleElement = getByText("Salary");
    const priceElement = getByText("+2,000 UZS");
    const dateElement = getByText("20/02/2024");

    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(priceElement).toHaveClass("income");
  });

  test("renders transaction details for outcome", () => {
    const transaction: ITransactionResponse = {
      id: 2,
      title: "Groceries",
      timestamp: 1708419643728,
      price: "50",
      action: ETransactionActions.Outcome,
      comment: "comment",
    };

    const { getByText } = render(<Transaction {...transaction} />);
    const titleElement = getByText("Groceries");
    const priceElement = getByText("-50 UZS");
    const dateElement = getByText("20/02/2024");

    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(priceElement).toHaveClass("outcome");
  });
});
