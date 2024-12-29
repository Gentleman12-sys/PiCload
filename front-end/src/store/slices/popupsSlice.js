import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isNext: false,
  title: "",
  subtext: "",
  text: "",
  rejectText: "",
  buttonText: "",
  buttonTextDark: false,
  linkText: "",
  popupName: "",
  popupEmoji: "",
  categoryName: "",
  emojiBackground: "",
  productPrice: "",
  productStorageCount: 0,
  openPremiumPopup: false,
  openWithdrawPopup: false,
  openVerifyPopup: false
};

const popupsSlice = createSlice({
  name: "popups",
  initialState: initialState,
  reducers: {
    setPopupData: (state, action) => ({
      ...initialState,
      ...action.payload
    }),
    setClosePopup: (state) => {
      return {
        isOpen: false,
        ...initialState
      }
    },
    setNextPopup: (state) => {
      state.isNext = true;
    }
  },
});

export const { setPopupData, setClosePopup, setNextPopup } =
  popupsSlice.actions;

export default popupsSlice.reducer;
