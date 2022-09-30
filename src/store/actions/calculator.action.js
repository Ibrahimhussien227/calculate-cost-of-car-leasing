import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const saveNewData = createAsyncThunk("list/newdata", async (form) => {
  const response = await api.post({
    calculatorData: form,
  });
  return response.todo;
});
