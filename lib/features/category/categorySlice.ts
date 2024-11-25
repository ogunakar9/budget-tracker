import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BudgetState } from "@/lib/features/budget/budgetSlice";

export interface CategoryState {
  categoryLimits: { [category: string]: number }; // Budget limits for each category
  categoryWarnings: { [category: string]: boolean }; // Warnings for categories exceeding 80% of the limit
}

const initialState: CategoryState = {
  categoryLimits: {},
  categoryWarnings: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryLimit: (
      state,
      action: PayloadAction<{ category: string; limit: number }>
    ) => {
      const { category, limit } = action.payload;
      state.categoryLimits[category] = limit;
    },
    calculateWarnings: (
      state,
      action: PayloadAction<{ budget: BudgetState }>
    ) => {
      const { budget } = action.payload;

      // Iterate through each category with a limit and calculate totals
      Object.keys(state.categoryLimits).forEach((category) => {
        const categoryTotal = budget.expenses
          .filter((expense) => expense.category === category)
          .reduce((sum, expense) => sum + expense.amount, 0);

        const limit = state.categoryLimits[category];
        state.categoryWarnings[category] = categoryTotal >= limit * 0.8;
      });
    },
  },
});

export const { setCategoryLimit, calculateWarnings } = categorySlice.actions;
export default categorySlice.reducer;
