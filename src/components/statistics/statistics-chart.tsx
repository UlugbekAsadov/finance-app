import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ITransactionResponse } from "../../utils/interfaces/transaction-actions.interface";
import { TMoneyCardType } from "../../utils/types/money-card.type";
import { formatTimestamp } from "../../utils/helper/timestamp-formatter";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IProps {
  transactions: ITransactionResponse[];
  transactionType: TMoneyCardType;
}

export function StatisticsChart({ transactions, transactionType }: IProps) {
  const isIncomeType = transactionType === "income";
  const labels = transactions.map(({ timestamp }) => formatTimestamp(timestamp).fullDate);
  const values = transactions.map(({ price }) => parseInt(price));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: transactionType,
      },
    },
    width: "50%",
  };

  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "Dataset 1",
        data: values.reverse(),

        borderColor: isIncomeType ? "rgba(0, 135, 95)" : "rgb(255, 99, 132)",
        backgroundColor: isIncomeType ? "rgba(0, 135, 95, 0.5)" : "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
