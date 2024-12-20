import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "@/lib/features/budget/budgetSlice";
import categoryReducer from "@/lib/features/category/categorySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      budget: budgetReducer,
      category: categoryReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
