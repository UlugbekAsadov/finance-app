// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { Transaction } from "./transaction";
// import { ETransactionActions } from "../../../utils/enums/transaction-actions.enum";
//
// describe("Transaction", () => {
//   const mockTransaction = {
//     id: "1",
//     title: "Sample Transaction",
//     timestamp: 1645237000000,
//     price: "100",
//     action: ETransactionActions.Income,
//     comment: "Sample Comment",
//   };
//
//   test("renders transaction with income action", () => {
//     render(<Transaction {...mockTransaction} />);
//
//     const transactionTitle = screen.getByText("Sample Transaction");
//     expect(transactionTitle).toBeInTheDocument();
//
//     const transactionComment = screen.getByText("Sample Comment");
//     expect(transactionComment).toBeInTheDocument();
//
//     const transactionPrice = screen.getByText("+100 $");
//     expect(transactionPrice).toBeInTheDocument();
//
//     const transactionDate = screen.getByText("19/02/2022"); // Adjust with your date format
//     expect(transactionDate).toBeInTheDocument();
//   });
//
//   test("renders transaction with outcome action", () => {
//     const mockOutcomeTransaction = {
//       ...mockTransaction,
//       action: ETransactionActions.Outcome,
//       price: "50", // Adjust the price for outcome transaction
//     };
//
//     render(<Transaction {...mockOutcomeTransaction} />);
//
//     const transactionTitle = screen.getByText("Sample Transaction");
//     expect(transactionTitle).toBeInTheDocument();
//
//     const transactionComment = screen.getByText("Sample Comment");
//     expect(transactionComment).toBeInTheDocument();
//
//     const transactionPrice = screen.getByText("-50 $");
//     expect(transactionPrice).toBeInTheDocument();
//
//     const transactionDate = screen.getByText("19/02/2022"); // Adjust with your date format
//     expect(transactionDate).toBeInTheDocument();
//   });
// });
