import React from "react";
import { render, screen } from "@testing-library/react";
import { Transactions } from "./transactions";
import { ITransactionResponse } from "../../utils/interfaces/transaction-actions.interface";
import { ETransactionActions } from "../../utils/enums/transaction-actions.enum";
import { ModalProvider } from "../../context/modal-context/modal.context";

describe("Transactions component", () => {
  const transactions: ITransactionResponse[] = [
    {
      id: "1",
      title: "Transaction 1",
      price: "100",
      action: ETransactionActions.Outcome,
      comment: "test comments",
      timestamp: new Date().getTime(),
    },
    {
      id: "2",
      title: "Transaction 2",
      price: "200",
      action: ETransactionActions.Outcome,
      comment: "test comments",
      timestamp: new Date().getTime(),
    },
  ];

  it("renders transactions list correctly", () => {
    render(
      <ModalProvider>
        <Transactions transactions={transactions} title="Transactions" refetch={jest.fn()} />
      </ModalProvider>,
    );

    expect(screen.getByText("Transactions")).toBeInTheDocument();

    transactions.forEach((transaction) => {
      expect(screen.getByText(transaction.title)).toBeInTheDocument();
    });
  });
});
