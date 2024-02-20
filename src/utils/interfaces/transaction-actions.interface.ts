import { ETransactionActions } from "../enums/transaction-actions.enum";

export interface ITransactionForm {
  title: string;
  price: string;
  action: ETransactionActions;
  comment: string;
}

export interface ITransactionFormRequest extends ITransactionForm {
  timestamp: number;
}

export interface ITransactionResponse extends ITransactionForm {
  id: string;
  timestamp: number;
}

export interface ITransactionData {
  income: number;
  outcome: number;
}
