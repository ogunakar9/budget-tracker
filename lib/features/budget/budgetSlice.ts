import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Operation {
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
  category?: string;
}

export interface BudgetState {
  incomes: Array<Operation>;
  expenses: Array<Operation>;
  netChange: number; // Store the calculated net change in the state
  lastFiveOperations?: Array<Operation>;
  totalOperationsOfLastMonth?: Array<Operation>;
  totalOperationsOfThisMonth?: Array<Operation>;
}

// Retrieve initial data from localStorage if available
const loadFromLocalStorage = () => {
  const savedIncomes = localStorage.getItem("income");
  const savedExpenses = localStorage.getItem("expense");

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
    addOperation: (state, action: PayloadAction<Operation>) => {
      if (action.payload.type === "income") {
        state.incomes.push(action.payload);
        localStorage.setItem("income", JSON.stringify(state.incomes)); // Save to localStorage
      } else {
        state.expenses.push(action.payload);
        localStorage.setItem("expense", JSON.stringify(state.expenses)); // Save to localStorage
      }
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
    calculateLastFiveOperations: (state) => {
      // Combine incomes and expenses into a single array
      const allOperations = [...state.incomes, ...state.expenses];

      // Sort operations by date in descending order
      allOperations.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Get the last 5 operations
      state.lastFiveOperations = allOperations.slice(0, 5);
    },
    calculateTotalOperationsOfLastMonth: (state) => {
      const today = new Date();
      const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
      const lastMonthYear =
        today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();

      const filterOperationsForMonth = (operation: Operation) => {
        const operationDate = new Date(operation.date);

        return (
          operationDate.getMonth() === lastMonth &&
          operationDate.getFullYear() === lastMonthYear
        );
      };

      const lastMonthIncomes = state.incomes.filter(filterOperationsForMonth);
      const lastMonthExpenses = state.expenses.filter(filterOperationsForMonth);

      state.totalOperationsOfLastMonth = [
        ...lastMonthIncomes,
        ...lastMonthExpenses,
      ];
    },
    calculateTotalOperationsOfThisMonth: (state) => {
      const today = new Date();
      const thisMonth = today.getMonth();
      const thisYear = today.getFullYear();

      const filterOperationsForMonth = (operation: Operation) => {
        const operationDate = new Date(operation.date);

        return (
          operationDate.getMonth() === thisMonth &&
          operationDate.getFullYear() === thisYear
        );
      };

      const thisMonthIncomes = state.incomes.filter(filterOperationsForMonth);
      const thisMonthExpenses = state.expenses.filter(filterOperationsForMonth);

      state.totalOperationsOfThisMonth = [
        ...thisMonthIncomes,
        ...thisMonthExpenses,
      ];
    },
  },
});

// Selectors
export const selectNetChange = (state: { budget: BudgetState }) =>
  state.budget.netChange;
export const selectIncome = (state: { budget: BudgetState }) =>
  state.budget.incomes;
export const selectExpense = (state: { budget: BudgetState }) =>
  state.budget.expenses;
export const selectLastFiveOperations = (state: { budget: BudgetState }) =>
  state.budget.lastFiveOperations;
export const selectTotalOperationsOfLastMonth = (state: {
  budget: BudgetState;
}) => state.budget.totalOperationsOfLastMonth;
export const selectTotalOperationsOfThisMonth = (state: {
  budget: BudgetState;
}) => state.budget.totalOperationsOfThisMonth;

export const {
  addOperation,
  calculateNetChange,
  calculateLastFiveOperations,
  calculateTotalOperationsOfLastMonth,
  calculateTotalOperationsOfThisMonth,
} = budgetSlice.actions;

export default budgetSlice.reducer;
