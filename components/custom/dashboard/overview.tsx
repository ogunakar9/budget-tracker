"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { BudgetState, Operation } from "@/lib/features/budget/budgetSlice";
import { groupOperationsByMonth } from "@/lib/utils";

export function Overview() {
  // Access incomes and expenses from the Redux state
  const incomes: Array<Operation> = useSelector(
    (state: { budget: BudgetState }) => state.budget.incomes
  );
  const expenses: Array<Operation> = useSelector(
    (state: { budget: BudgetState }) => state.budget.expenses
  );

  // Group incomes and expenses by month
  const incomeData = groupOperationsByMonth(incomes);
  const expenseData = groupOperationsByMonth(expenses);

  // Combine incomes and expenses into a single dataset
  const combinedData = incomeData.map((income, index) => ({
    name: income.name,
    income: income.total || 0,
    expense: expenseData[index]?.total || 0,
  }));

  // [
  //   { name: "Jan", income: 3000, expense: 1500 },
  //   { name: "Feb", income: 2000, expense: 500 },
  //   { name: "Mar", income: 0, expense: 0 },
  //   ...
  // ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={combinedData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="income"
          fill="green"
          radius={[4, 4, 0, 0]}
          name="Incomes"
        />
        <Bar
          dataKey="expense"
          fill="red"
          radius={[4, 4, 0, 0]}
          name="Expenses"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
