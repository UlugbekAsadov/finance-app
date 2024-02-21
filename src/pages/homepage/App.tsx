import React from "react";
import { Header } from "../../components/header/header";
import { MoneyCards } from "../../components/money-cards/money-cards";
import { Transactions } from "../../components/transactions/transactions";
import { useQuery } from "@tanstack/react-query";
import { ITransactionResponse } from "../../utils/interfaces/transaction-actions.interface";
import { getAllTransactionQueryFn } from "../../react-query/queries/transactions.query";

function App() {
  const { data: transactions } = useQuery<ITransactionResponse[]>({
    queryKey: ["all-transactions"],
    queryFn: () => getAllTransactionQueryFn(),
  });

  return (
    <div>
      <Header />
      <MoneyCards />
      <Transactions transactions={transactions || []} />
    </div>
  );
}

export default App;
