import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  ITransactionForm,
  ITransactionFormRequest,
} from "../../../utils/interfaces/transaction-actions.interface";
import { Input } from "../../input/input";
import { ReactComponent as ChevronUpRoundedIcon } from "../../../assets/icons/chevron-up-rounded.svg";
import { ReactComponent as ChevronDownRoundedIcon } from "../../../assets/icons/chevron-down-rounded.svg";
import { ETransactionActions } from "../../../utils/enums/transaction-actions.enum";
import { Button } from "../../button/button";
import { getFetchedData, useApi } from "../../../hooks/useApi/useApi";

import "./transaction-actions.css";

const initialTransactionForm: ITransactionForm = {
  title: "",
  price: "",
  action: ETransactionActions.Outcome,
  comment: "",
};

export const TransactionActions = () => {
  const [transactionForm, setTransactionForm] = useState<ITransactionForm>(initialTransactionForm);
  const [errors, setErrors] = useState<ITransactionForm>(initialTransactionForm);
  const data = getFetchedData("data");
  const { postData: postTransaction } = useApi("transactions", "/transactions");
  const { putData } = useApi("data", "/data");
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ETransactionActions) => {
    if (typeof e === "string") {
      setTransactionForm((prevState) => ({ ...prevState, action: e }));
    } else {
      setErrors((prevState) => ({ ...prevState, [e.target.name]: "" }));
      const { name, value } = e.target;
      setTransactionForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validate = validateForm();

    if (!validate) return;

    const body: ITransactionFormRequest = {
      ...transactionForm,
      timestamp: new Date().getTime(),
    };

    const dashboardData = {
      income: data.income,
      outcome: data.outcome,
    };

    if (transactionForm.action === ETransactionActions.Outcome) {
      dashboardData.outcome += parseInt(transactionForm.price);
    } else {
      dashboardData.income += parseInt(transactionForm.price);
    }

    await putData(dashboardData);
    await postTransaction(body);
  };

  const validateForm = (): boolean => {
    const fieldsToValidate = ["title", "price", "comment"];

    let isValid = true;

    fieldsToValidate.forEach((field) => {
      if (!transactionForm[field as keyof ITransactionForm].length) {
        setErrors((prevState) => ({ ...prevState, [field]: "error" }));
        isValid = false;
      }
    });

    return isValid;
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
          className={errors.title}
        />
        <Input
          onChange={handleChange}
          value={transactionForm.price}
          name="price"
          placeholder="Amount"
          type="number"
          className={errors.price}
        />
        <Input
          onChange={handleChange}
          value={transactionForm.comment}
          name="comment"
          placeholder="Comment"
          className={errors.comment}
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
