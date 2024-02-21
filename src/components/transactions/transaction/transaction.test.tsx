import React from "react";
import { render } from "@testing-library/react";
import { Transaction } from "./transaction";
import { ITransactionResponse } from "../../../utils/interfaces/transaction-actions.interface";
import { ETransactionActions } from "../../../utils/enums/transaction-actions.enum";

jest.mock("../../../context/modal-context/modal.context", () => ({
  useModalContext: () => ({
    openModal: jest.fn(),
  }),
}));

describe("Transaction component", () => {
  const mockTransaction: ITransactionResponse = {
    id: "1",
    title: "Transaction 1",
    timestamp: Date.now(),
    price: "100",
    action: ETransactionActions.Income,
    comment: "This is a test transaction",
  };

  it("renders transaction details correctly", () => {
    const { getByText } = render(<Transaction transaction={mockTransaction} refetch={jest.fn()} />);

    expect(getByText("Transaction 1")).toBeInTheDocument();
    expect(getByText("This is a test transaction")).toBeInTheDocument();
    expect(getByText("+ 100 $")).toBeInTheDocument(); // Assuming this is how positive values are rendered
  });
});
