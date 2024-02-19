import React, { MouseEventHandler, ReactNode } from "react";
import { ReactComponent as XIcon } from "../../assets/icons/x.svg";
import "./modal.css";
import { useModalContext } from "../../context/modal-context/modal.context";

interface IProps {
  children: ReactNode;
  id: string;
}

export const Modal = ({ children, id }: IProps) => {
  const { closeModal } = useModalContext();

  const handleInsideClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="modal-overlay"
      data-testid="modal-overlay"
      onClick={closeModal.bind(null, { id })}
    >
      <div className="modal" onClick={handleInsideClick}>
        <div className="modal-content">{children}</div>
        <button
          className="modal-close"
          data-testid="modal-close-button"
          onClick={closeModal.bind(null, { id })}
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
};
