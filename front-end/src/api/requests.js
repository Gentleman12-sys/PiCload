import axios from "axios"

const VITE_DEV_URL = import.meta.env.VITE_DEV_URL

const api = axios.create({
  baseURL: VITE_DEV_URL,
  timeout: 10000,
});

// lastS = on server

// 659350172

export const getUserData = async (userId) => await api.get(`/api/?tg_id=${userId}`).catch(err => console.log(err))

export const getUserCategoryData = async (userId) => await api.get(`/api/categoryofuser?tg_id=${userId}`).catch(err => console.log(err))

export const sendPromocode = async (userId, code) => await api.put("/api/enterPromocode", {
  tg_id: userId,
  code: code
}).catch(err => console.log(err))

export const getErrorMessage = async () => await api.get("/api/randomError").catch(err => console.log(err))

export const sendImages = async (userId, photos, categoryTitle) => await api.put("/api/uploadimage", {
  tg_id: userId,
  photos,
  cat_title: categoryTitle
}).catch(err => console.log(err))

export const updateBonusesDataS = async (userId) => await api.put("/api/successBonus", {
  tg_id: userId,
}).catch(err => console.log(err))

export const getUserBonuses = async (userId) => await api.get(`/api/getBonusInfo?tg_id=${userId}`).catch(err => console.log(err))

export const checkGroupMember = async (userId, groupId) => await api.put("/api/memberStatus", {
  tg_id: userId,
  chat_id: "@picload"
}).catch(err => console.log(err))

export const updateMaxStorageDataS = async (userId, memoryAll) => await api.put("/api/updateMaxStorage", {
  tg_id: userId,
  max_storage: memoryAll
}).catch(err => console.log(err))

export const updatePremiumDataS = async (userId, memoryAll) => await api.put("/api/updatePremium", {
  tg_id: userId,
}).catch(err => console.log(err))