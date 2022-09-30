import { configureStore } from "@reduxjs/toolkit";
import { calculatorReducer } from "./reducers/calculator.reducer";

export const store = configureStore({
  reducer: {
    [calculatorReducer.name]: calculatorReducer.reducer,
  },
});
