import { ReactNode } from "react";

export interface IModalContext {
  openModal: ({ id, component }: IModal) => void;
  closeModal: ({ id }: IModalClose) => void;
}

export interface IModal {
  id: string;
  component: ReactNode;
}

export interface IModalClose {
  id: string;
}
