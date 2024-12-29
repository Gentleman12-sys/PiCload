import { createSlice } from "@reduxjs/toolkit";

export const withdrawState = {
  inputCardNumber: "",
  inputWithdrawNumber: "",
};

const withdrawSlice = createSlice({
  name: "withdraw",
  initialState: withdrawState,
  reducers: {
    setInputCardNumber: (state, action) => {
      state.inputCardNumber = action.payload;
    },
    setInputWithdrawNumber: (state, action) => {
      state.inputWithdrawNumber = action.payload;
    }
  },
});

export const {
  setInputCardNumber,
  setInputWithdrawNumber,
  withdraw,
} = withdrawSlice.actions;
export default withdrawSlice.reducer;
