import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { TransactionActions } from "./transaction-actions";
import { ITransactionResponse } from "../../../utils/interfaces/transaction-actions.interface";
import { ETransactionActions } from "../../../utils/enums/transaction-actions.enum";
import ReactQueryContext from "../../../react-query/react-query.context";
import { ModalProvider } from "../../../context/modal-context/modal.context";

describe("TransactionActions component", () => {
  const mockRefetch = jest.fn();

  const mockTransaction: ITransactionResponse = {
    id: "1",
    title: "Transaction 1",
    timestamp: Date.now(),
    price: "100",
    action: ETransactionActions.Income,
    comment: "This is a test transaction",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <ReactQueryContext>
        <ModalProvider>
          <TransactionActions transaction={mockTransaction} refetch={mockRefetch} />,
        </ModalProvider>
      </ReactQueryContext>,
    );

    expect(getByPlaceholderText("Title")).toBeInTheDocument();
    expect(getByPlaceholderText("Amount")).toBeInTheDocument();
    expect(getByPlaceholderText("Comment")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
  });

  it("validates form on submit", async () => {
    const { getByText } = render(
      <ReactQueryContext>
        <ModalProvider>
          <TransactionActions transaction={mockTransaction} refetch={mockRefetch} />
        </ModalProvider>
      </ReactQueryContext>,
    );

    fireEvent.click(getByText("Save"));
    await waitFor(() => {
      expect(mockRefetch).not.toHaveBeenCalled();
    });
  });
});
