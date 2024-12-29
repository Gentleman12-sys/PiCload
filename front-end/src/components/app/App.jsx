import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

import { setPopupData } from "../../store/slices/popupsSlice";

import Main from "../pages/main/Main";
import Shop from "../pages/shop/Shop";
import Bonus from "../pages/bonus/Bonus";
import Login from "../pages/login/Login";
import Layout from "../pages/Layout";
import { getIdFromAddress, getUserDataHelper } from "../../helpers/helpers";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoryAll, memoryUse } = useSelector((state) => state.user);

  useEffect(() => {
    const userId = getIdFromAddress();
    if (userId !== null) {
      if (!localStorage.getItem("userId")) {
        navigate("/login");
      }
      localStorage.setItem("userId", userId);
    }
    getUserDataHelper(userId, dispatch);
    if (memoryAll - memoryUse < 0.3) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "warning",
          title: "Внимание ⚠️",
          text: "Ваше хранилище почти заполнено! Вы можете увеличить его размер в магазине.",
          buttonText: "Закрыть",
          buttonTextDark: true,
          linkText: "Увеличить",
        })
      );
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/bonus" element={<Bonus />} />
      </Route>
    </Routes>
  );
};

export default App;
