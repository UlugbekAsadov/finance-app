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
import { QueryObserverResult, RefetchOptions, useMutation, useQuery } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransactionFn,
  updateTransactionFn,
  updateTransactionsDataFn,
} from "../../../react-query/mutations/transaction.mutation";
import { useModalContext } from "../../../context/modal-context/modal.context";

import "./transaction-actions.css";

const initialTransactionForm: ITransactionForm = {
  title: "",
  price: "",
  action: ETransactionActions.Income,
  comment: "",
};

interface IProps {
  transaction?: ITransactionResponse;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
}

export const TransactionActions = ({ transaction, refetch }: IProps) => {
  const [isIsMutating, setIsMutating] = useState<boolean>(false);
  const [transactionForm, setTransactionForm] = useState<ITransactionForm>(
    transaction || initialTransactionForm,
  );
  const [errors, setErrors] = useState<ITransactionForm>(initialTransactionForm);
  const createTransactionMutation = useMutation({
    mutationFn: (data: ITransactionFormRequest) => createTransaction(data),
  });
  const updateTransactionDataMutation = useMutation({
    mutationFn: (data: ITransactionData) => updateTransactionsDataFn(data),
  });
  const transactionDataQuery = useQuery<ITransactionData>({ queryKey: ["transactions-data"] });

  const deleteTransactionMutation = useMutation({
    mutationFn: () => deleteTransactionFn(transaction?.id as string),
  });

  const editTransactionMutation = useMutation({
    mutationFn: (transaction: ITransactionResponse) => updateTransactionFn(transaction),
  });
  const { closeModal } = useModalContext();
  const isEdit = !!transaction;

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
    setIsMutating(true);
    e.preventDefault();
    const validate = validateForm();

    if (!validate) return;

    if (isEdit) {
      return editTransaction();
    }
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

    await updateTransactionDataMutation.mutateAsync(transactionData);
    await createTransactionMutation.mutateAsync(body);
    await transactionDataQuery.refetch();
    await refetch();
    closeModal({ id: "new-transaction" });
    setIsMutating(false);
  };

  const editTransaction = async () => {
    if (!transaction) return;

    const body: ITransactionResponse = {
      ...transactionForm,
      timestamp: transaction.timestamp,
      id: transaction.id,
    };

    const transactionData = { ...transactionDataQuery.data } as ITransactionData;
    const price = parseInt(transaction.price);
    const modifiedPrice = parseInt(transactionForm.price);
    const marginPrice = modifiedPrice - price;

    if (transaction.action === ETransactionActions.Income) {
      transactionData.income += marginPrice;
    } else {
      transactionData.outcome += marginPrice;
    }

    await updateTransactionDataMutation.mutateAsync(transactionData);
    await editTransactionMutation.mutateAsync(body);
    await refetch();
    await transactionDataQuery.refetch();
    setIsMutating(false);
    closeModal({ id: "transaction-edit" });
  };
  const validateForm = (): boolean => {
    const fieldsToValidate = ["title", "price", "comment"];

    let isValid = true;

    fieldsToValidate.forEach((field) => {
      if (!transactionForm[field as keyof ITransactionForm]?.length) {
        setErrors((prevState) => ({ ...prevState, [field]: "error" }));
        isValid = false;
      }
    });

    return isValid;
  };

  const deleteTransaction = async () => {
    setIsMutating(true);
    if (!transaction) return;

    const transactionDataBody: ITransactionData = {
      ...transactionDataQuery.data,
    } as ITransactionData;

    if (transaction?.action === ETransactionActions.Income) {
      transactionDataBody.income -= parseInt(transaction.price);
    } else {
      transactionDataBody.outcome -= parseInt(transaction.price);
    }

    await updateTransactionDataMutation.mutateAsync(transactionDataBody);
    await deleteTransactionMutation.mutateAsync();
    await transactionDataQuery.refetch();
    await refetch();
    setIsMutating(false);
    closeModal({ id: "transaction-edit" });
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
        {!isEdit && (
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
        )}
        <Button
          isLoading={isIsMutating}
          size="lg"
          type="submit"
          className="transaction__actions-form-button"
        >
          Save
        </Button>
        {isEdit && (
          <Button size="lg" variant="danger" type="button" onClick={deleteTransaction}>
            Delete
          </Button>
        )}
      </form>
    </div>
  );
};
