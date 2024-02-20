import React from "react";
import { render, screen } from "@testing-library/react";
import { Transactions } from "./transactions";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(() => ({
    data: [
      {
        id: "1",
        title: "Transaction 1",
        amount: 100,
      },
      {
        id: "2",
        title: "Transaction 2",
        amount: 200,
      },
    ],
  })),
}));

describe("Transactions", () => {
  test("does not render transaction list if data is empty", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require("@tanstack/react-query"), "useQuery").mockReturnValue({ data: [] });

    render(<Transactions />);

    const transactionsListContainer = screen.queryByTestId("transactions-list");
    expect(transactionsListContainer).not.toBeInTheDocument();
  });
});
