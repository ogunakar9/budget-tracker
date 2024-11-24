import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BudgetState {
  incomes: Array<{ description: string; amount: number; date: string }>;
  expenses: Array<{
    description: string;
    amount: number;
    date: string;
    category: string;
  }>;
  netChange: number; // Store the calculated net change in the state
}

// Retrieve initial data from localStorage if available
const loadFromLocalStorage = () => {
  const savedIncomes = localStorage.getItem("incomes");
  const savedExpenses = localStorage.getItem("expenses");

  return {
    incomes: savedIncomes ? JSON.parse(savedIncomes) : [],
    expenses: savedExpenses ? JSON.parse(savedExpenses) : [],
    netChange: 0, // Default value for net change
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
    calculateNetChange: (state) => {
      const today = new Date();
      const currentMonth = today.getMonth(); // 0-indexed (January is 0)
      const currentYear = today.getFullYear();

      // Filter incomes and expenses for the current month
      const thisMonthIncomes = state.incomes.filter((income) => {
        const incomeDate = new Date(income.date);
        return (
          incomeDate.getMonth() === currentMonth &&
          incomeDate.getFullYear() === currentYear
        );
      });

      const thisMonthExpenses = state.expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      });

      // Calculate total income and expenses for this month
      const totalIncome = thisMonthIncomes.reduce(
        (sum, income) => sum + income.amount,
        0
      );

      const totalExpenses = thisMonthExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      // Update netChange in the state
      state.netChange = totalIncome - totalExpenses;
    },
  },
});

// Selectors
export const selectNetChange = (state: { budget: BudgetState }) =>
  state.budget.netChange;

export const { addIncome, addExpense, calculateNetChange } =
  budgetSlice.actions;
export default budgetSlice.reducer;
