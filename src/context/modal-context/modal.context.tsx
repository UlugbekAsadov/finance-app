import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { IModal, IModalClose, IModalContext } from "../../utils/interfaces/modal-context.interface";
import { Modal } from "../../components/modal/modal";

const ModalContext = createContext<IModalContext | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) throw Error("Context must be used within a Provider");

  return context;
};

interface IProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: IProviderProps) => {
  const [modals, setModals] = useState<IModal[]>([]);

  const openModal = ({ id, component }: IModal) => {
    setModals((prevState) => [...prevState, { id, component }]);
  };

  const closeModal = ({ id }: IModalClose) => {
    const filteredModal = modals.filter((modal) => modal.id !== id);

    setModals(filteredModal);
  };

  const value: IModalContext = useMemo(() => ({ openModal, closeModal }), []);

  const renderModals = modals.map(({ id, component }) => (
    <Modal id={id} key={id}>
      {component}
    </Modal>
  ));

  return (
    <ModalContext.Provider value={value}>
      {children}
      {renderModals}
    </ModalContext.Provider>
  );
};
