import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ModalProvider, useModalContext } from "./modal.context";

jest.mock("../../components/modal/modal", () => ({
  Modal: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("ModalProvider Component", () => {
  test("renders children and modals", () => {
    const ChildComponent = () => <div>Child Component</div>;

    const { getByText } = render(
      <ModalProvider>
        <ChildComponent />
      </ModalProvider>,
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });

  test("opens and closes modals", () => {
    const TestComponent = () => {
      const { openModal, closeModal } = useModalContext();

      const openTestModal = () => {
        openModal({ id: "testModal", component: <div>Test Modal</div> });
      };

      const closeTestModal = () => {
        closeModal({ id: "testModal" });
      };

      return (
        <div>
          <button onClick={openTestModal}>Open Modal</button>
          <button onClick={closeTestModal}>Close Modal</button>
        </div>
      );
    };

    const { getByText, queryByText } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    const closeModalButton = getByText("Close Modal");

    fireEvent.click(closeModalButton);
    expect(queryByText("Test Modal")).not.toBeInTheDocument();
  });
});
