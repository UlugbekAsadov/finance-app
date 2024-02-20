import { ETransactionActions } from "../enums/transaction-actions.enum";

export interface ITransactionForm {
  title: string;
  price: string;
  action: ETransactionActions;
}

export interface ITransactionResponse {
  id: number;
  title: string;
  price: number;
  type: ETransactionActions;
  timestamp: number;
}

export interface ITransactionStatus {
  income: number;
  outcome: number;
  total: number;
}
