import React from "react";
import { render } from "@testing-library/react";
import { MoneyCard } from "./money-card";

describe("MoneyCard Component", () => {
  test("renders money card component with income type", () => {
    const { getByText, getByTestId } = render(
      <MoneyCard type="Income" icon={<div>Icon</div>} price="100" />,
    );
    const typeElement = getByText("Income");
    const priceElement = getByText("100");
    const cardElement = getByTestId("money-card-total");
    expect(typeElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(cardElement).toHaveClass("money__card");
  });

  test("renders money card component with outcome type", () => {
    const { getByText, getByTestId } = render(
      <MoneyCard type="Outcome" icon={<div>Icon</div>} price="50" />,
    );
    const typeElement = getByText("Outcome");
    const priceElement = getByText("50");
    const cardElement = getByTestId("money-card-total");
    expect(typeElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(cardElement).toHaveClass("money__card");
  });

  test("renders money card component with total type", () => {
    const { getByText, getByTestId } = render(
      <MoneyCard type="Total" icon={<div>Icon</div>} price="500" />,
    );
    const typeElement = getByText("Total");
    const priceElement = getByText("500");
    const cardElement = getByTestId("money-card-total");
    expect(typeElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(cardElement).toHaveClass("money__card");
  });

  test("renders money card component with loading state", () => {
    const { getByText } = render(
      <MoneyCard type="Total" icon={<div>Icon</div>} price="500" isLoading={true} />,
    );
    const priceElement = getByText("500");
    expect(priceElement).toHaveClass("money__card-money loading");
  });
});
