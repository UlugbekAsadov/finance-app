import { Header } from "../../components/header/header";
import { useParams } from "react-router-dom";
import { MoneyCard } from "../../components/money-cards/money-card/money-card";
import { ReactComponent as ChevronDownRoundedIcon } from "../../assets/icons/chevron-down-rounded.svg";
import { ReactComponent as ChevronUpRoundedIcon } from "../../assets/icons/chevron-up-rounded.svg";
import { useQuery } from "@tanstack/react-query";
import { ITransactionData } from "../../utils/interfaces/transaction-actions.interface";
import { TMoneyCardType } from "../../utils/types/money-card.type";
import { StatisticsChart } from "../../components/statistics/statistics-chart";
import {
  getAllTransactionQueryFn,
  getTransactionsDataQueryFn,
} from "../../react-query/queries/transactions.query";

import { Transactions } from "../../components/transactions/transactions";

import "./statistics.css";
export const Statistics = () => {
  const params = useParams();
  const { transactionType } = params;

  const { data: transactionData, isLoading } = useQuery<ITransactionData>({
    queryKey: ["transactions-data"],
    queryFn: () => getTransactionsDataQueryFn(),
  });
  const { data: transactionsList, refetch } = useQuery({
    queryKey: ["all-transaction", transactionType],
    queryFn: () => getAllTransactionQueryFn(transactionType as TMoneyCardType),
  });

  const transactionIcons = {
    outcome: <ChevronDownRoundedIcon />,
    income: <ChevronUpRoundedIcon />,
  };

  if (!transactionData) {
    return null;
  }

  return (
    <div>
      <Header refetch={refetch} />
      <div className="container statistics__page-money-card">
        <MoneyCard
          type={transactionType as TMoneyCardType}
          icon={transactionIcons[transactionType as keyof typeof transactionIcons]}
          price={transactionData[transactionType as keyof typeof transactionData]}
          disableLink
          isLoading={isLoading}
        />
        <StatisticsChart
          transactionType={transactionType as TMoneyCardType}
          transactions={transactionsList || []}
        />
        <Transactions
          refetch={refetch}
          title={`${transactionType as string} transactions`}
          transactions={transactionsList}
        />
      </div>
    </div>
  );
};
