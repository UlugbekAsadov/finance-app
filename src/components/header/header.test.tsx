import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./header";
import { useModalContext } from "../../context/modal-context/modal.context";
import { TransactionActions } from "./transaction-actions/transaction-actions";

jest.mock("../../context/modal-context/modal.context", () => ({
  useModalContext: jest.fn(),
}));

describe("Header Component", () => {
  test("renders header component", () => {
    (useModalContext as any).mockReturnValue({ openModal: jest.fn() });

    const { getByTestId } = render(
      <Router>
        <Header />
      </Router>,
    );

    expect(getByTestId("header-component")).toBeInTheDocument();
  });

  test("opens new transaction modal when button is clicked", () => {
    const mockOpenModal = jest.fn();
    (useModalContext as any).mockReturnValue({ openModal: mockOpenModal });

    const { getByText } = render(
      <Router>
        <Header />
      </Router>,
    );

    const newTransactionButton = getByText("New transaction");
    fireEvent.click(newTransactionButton);

    expect(mockOpenModal).toHaveBeenCalledWith({
      id: "new-transaction",
      component: <TransactionActions />,
    });
  });
});
