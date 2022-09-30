import { createSlice } from "@reduxjs/toolkit";
import { saveNewData } from "../actions/calculator.action";

const intialState = {
  carValue: "",
  carFee: "",
  period: "",
  carIntialPayment: "",
  monthPay: "",
  total: "",
};

export const calculatorReducer = createSlice({
  name: "calculator",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveNewData.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});
