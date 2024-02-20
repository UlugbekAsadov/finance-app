import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Transactions } from "./transactions";
import { useApi } from "../../hooks/useApi/useApi";
import { ITransactionResponse } from "../../utils/interfaces/transaction-actions.interface";
import { ETransactionActions } from "../../utils/enums/transaction-actions.enum";

jest.mock("../../hooks/useApi/useApi", () => ({
  useApi: jest.fn(),
}));

describe("Transactions Component", () => {
  test("renders transactions list when data is available", async () => {
    const mockTransactions: ITransactionResponse[] = [
      {
        id: 1,
        title: "Salary",
        timestamp: 1708419643728,
        price: "2000",
        comment: "comment",
        action: ETransactionActions.Income,
      },
      {
        id: 2,
        title: "Groceries",
        timestamp: 1708419643728,
        price: "50",
        comment: "comment",
        action: ETransactionActions.Outcome,
      },
    ];

    (useApi as jest.Mock).mockReturnValue({ data: mockTransactions });

    const { getByText } = render(<Transactions />);

    await waitFor(() => {
      const salaryElement = getByText("Salary");
      const groceriesElement = getByText("Groceries");

      expect(salaryElement).toBeInTheDocument();
      expect(groceriesElement).toBeInTheDocument();
    });
  });

  test("does not render transactions list when data is not available", () => {
    (useApi as jest.Mock).mockReturnValue({ data: [] });

    const { container } = render(<Transactions />);

    expect(container.firstChild).toBeNull();
  });
});
