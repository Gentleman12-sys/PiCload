import { createSlice } from "@reduxjs/toolkit";

export const profileState = {
  userId: null,
  avatar: null,
  name: "Testing Name",
  username: "@user",
  memoryUse: 0,
  memoryAll: 1000,
  memoryPercent: 100,
  errorPercent: 0,
  balance: 0,
  income: 0,
  isPremium: false,
  rewardByMember: false,
  picSize: [],
  picPay: [],
  quantityOfPictures: 0,
  categoriesData: [],
  referrerCount: 0
};

const userSlice = createSlice({
  name: "user",
  initialState: profileState,
  reducers: {
    updateUserData: (state, action) => ({
      ...state,
      ...action.payload
    }),
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
    updatePercent: (state, action) => {
      state.memoryPercent = action.payload;
    },
    updateCategoriesData: (state, action) => {
      state.categoriesData = action.payload;
    },
    addBalanceAndCatCount: (state, action) => {
      const { balanceToAdd, catName, imagesCount, imagesSizeToAdd } = action.payload
      state.balance += balanceToAdd;
      state.income += balanceToAdd;
      state.categoriesData = state.categoriesData.map(el => el.name === catName ? ({ ...el, loaded: el.loaded + Number(imagesCount) }) : el)
      state.quantityOfPictures += Number(imagesCount)
      state.memoryUse += imagesSizeToAdd
    },
    setMemberStatus: (state, action) => {
      state.rewardByMember = action.payload
    },
    setPremiumStatus: (state, action) => {
      state.isPremium = action.payload
    }
  },
});

export const { updateBalance, updatePercent, updateUserData, updateCategoriesData, addBalanceAndCatCount, setPremiumStatus, setMemberStatus } = userSlice.actions;

export default userSlice.reducer;
