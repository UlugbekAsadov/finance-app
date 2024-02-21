import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./header";

jest.mock("../../context/modal-context/modal.context", () => ({
  useModalContext: () => ({ openModal: jest.fn() }),
}));

const mockRefetch = jest.fn();

describe("Header Component", () => {
  it("renders header with logo and new transaction button", () => {
    render(
      <MemoryRouter>
        <Header refetch={mockRefetch} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Finance")).toBeInTheDocument();

    expect(screen.getByText("New transaction")).toBeInTheDocument();
  });
});
