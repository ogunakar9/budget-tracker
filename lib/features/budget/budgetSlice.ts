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

const initialState: BudgetState = {
  incomes: [],
  expenses: [],
};

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
    },
  },
});

export const { addIncome, addExpense } = budgetSlice.actions;
export default budgetSlice.reducer;
