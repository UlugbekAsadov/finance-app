import { ETransactionActions } from "../enums/transaction-actions.enum";

export interface ITransactionForm {
  title: string;
  price: string;
  action: ETransactionActions;
}

export interface ITransactionStatus {
  income: number;
  outcome: number;
  total: number;
}
