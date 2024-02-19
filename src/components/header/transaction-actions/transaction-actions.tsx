import React, { ChangeEvent, FormEvent, useState } from "react";
import { ITransactionForm } from "../../../utils/interfaces/transaction-actions.interface";
import { Input } from "../../input/input";
import { ReactComponent as ChevronUpRoundedIcon } from "../../../assets/icons/chevron-up-rounded.svg";
import { ReactComponent as ChevronDownRoundedIcon } from "../../../assets/icons/chevron-down-rounded.svg";
import { ETransactionActions } from "../../../utils/enums/transaction-actions.enum";
import { Button } from "../../button/button";

import "./transaction-actions.css";

const initialTransactionForm: ITransactionForm = {
  title: "",
  price: "",
  action: ETransactionActions.Outcome,
};

export const TransactionActions = () => {
  const [transactionForm, setTransactionForm] = useState<ITransactionForm>(initialTransactionForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ETransactionActions) => {
    if (typeof e === "string") {
      setTransactionForm((prevState) => ({ ...prevState, action: e }));
    } else {
      const { name, value } = e.target;
      setTransactionForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const isIncomeSelected = transactionForm.action === ETransactionActions.Income;

  return (
    <div className="transaction__actions">
      <h2 className="transaction__actions-title">New Transaction</h2>
      <form className="transaction__actions-form" onSubmit={handleSubmit}>
        <Input
          onChange={handleChange}
          value={transactionForm.title}
          name="title"
          placeholder="Title"
        />
        <Input
          onChange={handleChange}
          value={transactionForm.price}
          name="price"
          placeholder="Amount"
        />
        <div className="transaction__actions-form-actions">
          <div
            className={`transaction__actions-form-action outcome ${!isIncomeSelected && "active"}`}
            onClick={() => handleChange(ETransactionActions.Outcome)}
            data-testid="outcome"
          >
            <ChevronUpRoundedIcon />
            <p>Outcome</p>
          </div>
          <div
            className={`transaction__actions-form-action income ${isIncomeSelected && "active"}`}
            onClick={() => handleChange(ETransactionActions.Income)}
            data-testid="income"
          >
            <ChevronDownRoundedIcon />
            <p>Income</p>
          </div>
        </div>
        <Button size="lg" type="submit" className="transaction__actions-form-button">
          Save
        </Button>
      </form>
    </div>
  );
};
