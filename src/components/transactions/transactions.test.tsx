import React from "react";
import { render } from "@testing-library/react";
import { Transactions } from "./transactions";
import { ITransactionResponse } from "../../utils/interfaces/transaction-actions.interface";
import { ETransactionActions } from "../../utils/enums/transaction-actions.enum";

describe("Transactions component", () => {
  it("renders nothing when transactions array is empty", () => {
    const { container } = render(<Transactions title="test title" transactions={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders transactions correctly", () => {
    const transactionsData: ITransactionResponse[] = [
      {
        id: "1",
        title: "Transaction 1",
        price: "100",
        action: ETransactionActions.Income,
        comment: "",
        timestamp: new Date().getTime(),
      },
      {
        id: "2",
        title: "Transaction 2",
        price: "200",
        action: ETransactionActions.Income,
        comment: "",
        timestamp: new Date().getTime(),
      },
    ];

    const { getByText } = render(
      <Transactions title="test title" transactions={transactionsData} />,
    );

    expect(getByText("Transaction 1")).toBeInTheDocument();
    expect(getByText("Transaction 2")).toBeInTheDocument();
  });
});
