import React from "react";
import { Header } from "./components/header/header";
import { MoneyCards } from "./components/money-cards/money-cards";
import { Transactions } from "./components/transactions/transactions";

function App() {
  return (
    <div>
      <Header />
      <MoneyCards />
      <Transactions />
    </div>
  );
}

export default App;
