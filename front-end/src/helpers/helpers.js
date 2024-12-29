import { updateCategoriesData, updateUserData } from "../store/slices/userSlice";
import { getUserCategoryData, getUserData } from "../api/requests";

import natureImg from "../img/icons/nature.svg";
import architectImg from "../img/icons/architect.svg";
import sportImg from "../img/icons/sport.svg";
import eatImg from "../img/icons/food.svg";
import adventureImg from "../img/icons/adventure.svg";

export const checkMemory = (memoryAll, memoryUse) => {
  let popupState = true;
  if (memoryAll - memoryUse <= 0.3) {
    return popupState;
  } else {
    return !popupState;
  }
};

export const countMemoryPercent = (memoryAll, memoryUse) => {
  let memoryLeft = memoryAll - memoryUse;
  let percent = Math.floor((memoryLeft / memoryAll) * 100);
  return percent;
};

// export const getIdFromAddress = () => 5106326939
export const getIdFromAddress = () => new URLSearchParams(window.location.search).get("tg_id")

export const sortCategoriesData = (categories) => {
  return categories.map((el) => {
    switch (el.title) {
      case "Природа":
        return {
          image: natureImg,
          name: el.title,
          type: "nature",
          typeBackground: "nature__bg",
          loaded: el.quantity,
        };
      case "Еда":
        return {
          image: eatImg,
          name: el.title,
          type: "eat",
          typeBackground: "eat__bg",
          loaded: el.quantity,
        };
      case "Спорт":
        return {
          image: sportImg,
          name: el.title,
          type: "sport",
          typeBackground: "sport__bg",
          loaded: el.quantity,
        };
      case "Путешествия":
        return {
          image: adventureImg,
          name: el.title,
          type: "adventure",
          typeBackground: "adventure__bg",
          loaded: el.quantity,
        };
      case "Архитектура":
        return {
          image: architectImg,
          name: el.title,
          type: "architect",
          typeBackground: "architect__bg",
          loaded: el.quantity,
        };
    }
  });
}

export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + min)) + min

export const getRandomFloatNumber = (min, max) => Number((Math.random() * (max - min) + min).toFixed(2))

export const parseTwoNumbers = (rangeString) => {
  return rangeString.replace(/[\[\)]/g, '').split(',');
}

export const getUserDataHelper = async (userId, dispatch) => {
  const userIdToUse = !userId ? Number(localStorage.getItem("userId")) : userId
  const userData = await getUserData(userIdToUse);
  const categoriesData = await getUserCategoryData(userIdToUse)
  dispatch(updateCategoriesData(
    sortCategoriesData(categoriesData.data)
  ));
  const { data: {
    avatar_url = "",
    first_name = "Unknown",
    username = "Anonymous",
    current_storage = 0,
    max_storage = 0,
    max_balance = 0,
    percent_error = 0,
    balance = 0,
    is_premium = false,
    income = 0,
    size_pic = [],
    pay_pic = [],
    referrer_count = 0,
    quantity_of_pictures = 0,
    reward_by_member = false
  } } = userData || {};
  dispatch(updateUserData({
    userId: userIdToUse,
    avatar: avatar_url,
    name: first_name,
    username: `@${username}`,
    balance: Number(balance),
    income: Number(income),
    isPremium: is_premium,
    memoryUse: Number(current_storage),
    memoryAll: Number(max_storage),
    maxBalance: Number(max_balance),
    errorPercent: Number(percent_error),
    picSize: size_pic,
    picPay: pay_pic,
    referrerCount: referrer_count,
    quantityOfPictures: quantity_of_pictures,
    rewardByMember: reward_by_member
  }))
}

export const getUserBalance = async (userId, dispatch) => {
  const userIdToUse = userId === null ? Number(localStorage.getItem("userId")) : userId
  const userData = await getUserData(userIdToUse);
  const { data: {
    balance = 0,
    income = 0,
  } } = userData || {};
  dispatch(updateUserData({
    balance: Number(balance),
    income: Number(income),
  }))
}