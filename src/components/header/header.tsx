import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { Button } from "../button/button";
import { Link } from "react-router-dom";
import { useModalContext } from "../../context/modal-context/modal.context";

import "./header.css";
export const Header = () => {
  const { openModal } = useModalContext();

  const openNewTransactionModal = () => {
    openModal({ id: "new-transaction", component: <>hello</> });
  };

  return (
    <header data-testid="header-component" className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo">
          <Logo />
          <span>Finance</span>
        </Link>
        <Button onClick={openNewTransactionModal} size="md" className="header__new-transaction">
          New transaction
        </Button>
      </div>
    </header>
  );
};
