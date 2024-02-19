import React from "react";
import { render } from "@testing-library/react";
import { Input } from "./input";

describe("Input Component", () => {
  test("renders input component", () => {
    const { getByTestId } = render(<Input data-testid="input-component" />);
    const inputComponent = getByTestId("input-component");
    expect(inputComponent).toBeInTheDocument();
  });

  test("applies className prop", () => {
    const { getByTestId } = render(
      <Input className="custom-class" data-testid="input-component" />,
    );
    const inputWrapper = getByTestId("input-component").parentElement;
    expect(inputWrapper).toHaveClass("custom-class");
  });

  test("renders leftIcon if provided", () => {
    const leftIcon = <div className="left-icon">Icon</div>;
    const { getByText } = render(<Input leftIcon={leftIcon} />);
    const leftIconElement = getByText("Icon");
    expect(leftIconElement).toBeInTheDocument();
  });

  test("forwards ref to input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});
