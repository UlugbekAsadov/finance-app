import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "../../context/modal-context/modal.context";
import ReactQueryContext from "../../react-query/react-query.context";

describe("App", () => {
  test("renders Header component", () => {
    render(
      <BrowserRouter>
        <ReactQueryContext>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ReactQueryContext>
      </BrowserRouter>,
    );
    const headerElement = screen.getByTestId("header-component");
    expect(headerElement).toBeInTheDocument();
  });
});
