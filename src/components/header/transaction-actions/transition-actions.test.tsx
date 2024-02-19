import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { TransactionActions } from "./transaction-actions";

describe("TransactionActions component", () => {
  test("renders transaction form", () => {
    render(<TransactionActions />);
    const titleInput = screen.getByPlaceholderText("Title");
    const amountInput = screen.getByPlaceholderText("Amount");
    const outcomeAction = screen.getByText("Outcome");
    const incomeAction = screen.getByText("Income");
    const saveButton = screen.getByText("Save");

    expect(titleInput).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(outcomeAction).toBeInTheDocument();
    expect(incomeAction).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test("updates form values on input change", () => {
    render(<TransactionActions />);
    const titleInput = screen.getByPlaceholderText("Title");
    const amountInput = screen.getByPlaceholderText("Amount");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(amountInput, { target: { value: "100" } });

    expect(titleInput).toHaveValue("Test Title");
    expect(amountInput).toHaveValue("100");
  });

  test("toggles transaction action", () => {
    render(<TransactionActions />);
    const outcomeAction = screen.getByTestId("outcome");
    const incomeAction = screen.getByTestId("income");

    fireEvent.click(outcomeAction);
    expect(outcomeAction).toHaveClass("active");
    expect(incomeAction).not.toHaveClass("active");

    fireEvent.click(incomeAction);
    expect(outcomeAction).not.toHaveClass("active");
    expect(incomeAction).toHaveClass("active");
  });
});
