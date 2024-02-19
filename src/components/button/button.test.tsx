import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button Component", () => {
  test("renders button with default props", () => {
    const { getByText } = render(<Button>Hello</Button>);
    const buttonElement = getByText("Hello");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("button solid sm");
  });

  test("renders button with specified props", () => {
    const { getByText } = render(
      <Button variant="outline" size="lg" className="custom-class">
        Click me
      </Button>,
    );
    const buttonElement = getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("button outline lg custom-class");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
