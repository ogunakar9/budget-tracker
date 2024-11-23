import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BudgetState {
  incomes: Array<{ description: string; amount: number; date: string }>;
  expenses: Array<{
    description: string;
    amount: number;
    date: string;
    category: string;
  }>;
}

// Retrieve initial data from localStorage if available
const loadFromLocalStorage = () => {
  const savedIncomes = localStorage.getItem("incomes");
  const savedExpenses = localStorage.getItem("expenses");

  return {
    incomes: savedIncomes ? JSON.parse(savedIncomes) : [],
    expenses: savedExpenses ? JSON.parse(savedExpenses) : [],
  };
};

// Initialize state from localStorage or default to empty arrays
const initialState: BudgetState = loadFromLocalStorage();

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addIncome: (
      state,
      action: PayloadAction<{
        description: string;
        amount: number;
        date: string;
      }>
    ) => {
      state.incomes.push(action.payload);
      localStorage.setItem("incomes", JSON.stringify(state.incomes)); // Save to localStorage
    },
    addExpense: (
      state,
      action: PayloadAction<{
        description: string;
        amount: number;
        date: string;
        category: string;
      }>
    ) => {
      state.expenses.push(action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.expenses)); // Save to localStorage
    },
  },
});

export const { addIncome, addExpense } = budgetSlice.actions;
export default budgetSlice.reducer;
