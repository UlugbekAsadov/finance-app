// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import { TransactionActions } from "./transaction-actions";
// import ReactQueryContext from "../../../react-query/react-query.context";
// import { ModalProvider } from "../../../context/modal-context/modal.context";
//
// describe("TransactionActions", () => {
//   test("should render correctly", () => {
//     render(
//       <ReactQueryContext>
//         <ModalProvider>
//           <TransactionActions />
//         </ModalProvider>
//       </ReactQueryContext>,
//     );
//
//     expect(screen.getByText("New Transaction")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Comment")).toBeInTheDocument();
//     expect(screen.getByText("Outcome")).toBeInTheDocument();
//     expect(screen.getByText("Income")).toBeInTheDocument();
//     expect(screen.getByText("Save")).toBeInTheDocument();
//   });
//
//   test("should update form state on input change", () => {
//     render(
//       <ReactQueryContext>
//         <ModalProvider>
//           <TransactionActions />
//         </ModalProvider>
//       </ReactQueryContext>,
//     );
//
//     fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Test Title" } });
//     fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "100" } });
//     fireEvent.change(screen.getByPlaceholderText("Comment"), { target: { value: "Test Comment" } });
//
//     expect(screen.getByPlaceholderText("Title")).toHaveValue("Test Title");
//     expect(screen.getByPlaceholderText("Amount")).toHaveValue(100);
//     expect(screen.getByPlaceholderText("Comment")).toHaveValue("Test Comment");
//   });
//
//   test("should submit form on button click", () => {
//     render(
//       <ReactQueryContext>
//         <ModalProvider>
//           <TransactionActions />
//         </ModalProvider>
//       </ReactQueryContext>,
//     );
//
//     fireEvent.click(screen.getByText("Save"));
//   });
// });
