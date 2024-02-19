import React from "react";
import { render } from "@testing-library/react";
import { Modal } from "./modal";
import { useModalContext } from "../../context/modal-context/modal.context";

jest.mock("../../context/modal-context/modal.context", () => ({
  useModalContext: jest.fn(),
}));

describe("Modal Component", () => {
  test("renders modal component", () => {
    (useModalContext as any).mockReturnValue({ closeModal: jest.fn() });
    const { getByText } = render(
      <Modal id="test-modal">
        <div>Modal Content</div>
      </Modal>,
    );

    expect(getByText("Modal Content")).toBeInTheDocument();
  });
});
