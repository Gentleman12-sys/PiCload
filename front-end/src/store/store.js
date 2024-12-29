import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice.js";
import popupsSlice from './slices/popupsSlice';
import withdrawSlice from './slices/withdrawSlice.js'

const store = configureStore({
  reducer: {
    user: userSlice,
    popups: popupsSlice,
    withdraw: withdrawSlice,
  },
});

export default store;
