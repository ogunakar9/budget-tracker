import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Operation } from "./features/budget/budgetSlice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupOperationsByMonth(
  operations: Array<Operation>
): Array<{ name: string; total: number }> {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize totals for each month
  const monthlyTotals = new Array(12).fill(0);

  // Aggregate amounts by month
  operations.forEach((operation) => {
    const date = new Date(operation.date);
    const monthIndex = date.getMonth(); // 0-indexed
    monthlyTotals[monthIndex] += operation.amount;
  });

  // Format the data for the chart
  return monthlyTotals.map((total, index) => ({
    name: months[index],
    total,
  }));
}
