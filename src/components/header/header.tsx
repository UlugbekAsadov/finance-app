import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { Button } from "../button/button";
import { Link } from "react-router-dom";
import { useModalContext } from "../../context/modal-context/modal.context";
import { TransactionActions } from "./transaction-actions/transaction-actions";

import "./header.css";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface IProps {
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
}
export const Header = ({ refetch }: IProps) => {
  const { openModal } = useModalContext();

  const openNewTransactionModal = () => {
    openModal({ id: "new-transaction", component: <TransactionActions refetch={refetch} /> });
  };

  return (
    <header data-testid="header-component" className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo">
          <Logo />
          <span>Finance</span>
        </Link>
        <Button
          data-testid="new-transaction-button"
          onClick={openNewTransactionModal}
          size="md"
          className="header__new-transaction"
        >
          New transaction
        </Button>
      </div>
    </header>
  );
};
