import { ETransactionActions } from "../enums/transaction-actions.enum";

export interface ITransactionForm {
  title: string;
  price: string;
  action: ETransactionActions;
}
