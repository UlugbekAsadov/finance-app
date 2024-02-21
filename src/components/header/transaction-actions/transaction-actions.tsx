import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  ITransactionData,
  ITransactionForm,
  ITransactionFormRequest,
  ITransactionResponse,
} from "../../../utils/interfaces/transaction-actions.interface";
import { Input } from "../../input/input";
import { ReactComponent as ChevronUpRoundedIcon } from "../../../assets/icons/chevron-up-rounded.svg";
import { ReactComponent as ChevronDownRoundedIcon } from "../../../assets/icons/chevron-down-rounded.svg";
import { ETransactionActions } from "../../../utils/enums/transaction-actions.enum";
import { Button } from "../../button/button";

import "./transaction-actions.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTransaction,
  updateTransactionsDataFn,
} from "../../../react-query/mutations/transaction.mutation";
import { useModalContext } from "../../../context/modal-context/modal.context";

const initialTransactionForm: ITransactionForm = {
  title: "",
  price: "",
  action: ETransactionActions.Income,
  comment: "",
};

export const TransactionActions = () => {
  const [transactionForm, setTransactionForm] = useState<ITransactionForm>(initialTransactionForm);
  const [errors, setErrors] = useState<ITransactionForm>(initialTransactionForm);
  const createTransactionMutation = useMutation({
    mutationFn: (data: ITransactionFormRequest) => createTransaction(data),
  });
  const updateTransactionData = useMutation({
    mutationFn: (data: ITransactionData) => updateTransactionsDataFn(data),
  });
  const transactionDataQuery = useQuery<ITransactionData>({ queryKey: ["transactions-data"] });
  const transactions = useQuery<ITransactionResponse[]>({
    queryKey: ["all-transactions"],
  });
  const { closeModal } = useModalContext();

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

    const transactionData: ITransactionData = {
      income: transactionDataQuery?.data?.income || 0,
      outcome: transactionDataQuery?.data?.outcome || 0,
    };

    if (transactionForm.action === ETransactionActions.Outcome) {
      transactionData.outcome += parseInt(transactionForm.price);
    } else {
      transactionData.income += parseInt(transactionForm.price);
    }

    await updateTransactionData.mutateAsync(transactionData);
    await createTransactionMutation.mutateAsync(body);
    await transactionDataQuery.refetch();
    await transactions.refetch();
    closeModal({ id: "new-transaction" });
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
            className={`transaction__actions-form-action outcome ${isIncomeSelected && "active"}`}
            onClick={() => handleChange(ETransactionActions.Income)}
            data-testid="outcome"
          >
            <ChevronUpRoundedIcon />
            <p>Income</p>
          </div>
          <div
            className={`transaction__actions-form-action income ${!isIncomeSelected && "active"}`}
            onClick={() => handleChange(ETransactionActions.Outcome)}
            data-testid="income"
          >
            <ChevronDownRoundedIcon />
            <p>Outcome</p>
          </div>
        </div>
        <Button size="lg" type="submit" className="transaction__actions-form-button">
          Save
        </Button>
      </form>
    </div>
  );
};
