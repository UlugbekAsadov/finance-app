import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MoneyCard } from "./money-card";

describe("MoneyCard", () => {
  test("renders money card with total type", () => {
    render(
      <MemoryRouter>
        <MoneyCard type="total" icon={<div>Icon</div>} price="100" />
      </MemoryRouter>,
    );

    const moneyCardTotal = screen.getByTestId("money-card-total");
    expect(moneyCardTotal).toBeInTheDocument();

    const moneyCardHeader = screen.getByText("total");
    expect(moneyCardHeader).toBeInTheDocument();

    const moneyCardIcon = screen.getByText("Icon");
    expect(moneyCardIcon).toBeInTheDocument();

    const moneyCardPrice = screen.getByText("100 $");
    expect(moneyCardPrice).toBeInTheDocument();
  });

  test("renders money card with loading state", () => {
    render(
      <MemoryRouter>
        <MoneyCard type="income" icon={<div>Icon</div>} price="50" isLoading />
      </MemoryRouter>,
    );

    const moneyCardTotal = screen.getByTestId("money-card-total");
    expect(moneyCardTotal).toBeInTheDocument();

    const moneyCardPrice = screen.getByText("50 $");
    expect(moneyCardPrice).toHaveClass("loading");
  });
});
