import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/modal-context/modal.context";

describe("App", () => {
  test("renders Header component", () => {
    render(
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>,
    );
    const headerElement = screen.getByTestId("header-component");
    expect(headerElement).toBeInTheDocument();
  });
});
