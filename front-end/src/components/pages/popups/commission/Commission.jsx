import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BottomSheet } from "react-spring-bottom-sheet";

import {
  setClosePopup,
  setPopupData,
} from "../../../../store/slices/popupsSlice";

import styles from "../withdraw/withdraw.module.scss";
import Withdraw from "./../withdraw/Withdraw";

const Commission = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { inputCardNumber, inputWithdrawNumber } = useSelector(
    (state) => state.withdraw
  );
  const { isPremium } = useSelector((state) => state.user);

  const { title } = useSelector((state) => state.popups);

  const closePopup = () => {
    dispatch(setClosePopup());
  };

  const commissionPaid = () => {
    dispatch(
      setPopupData({
        isOpen: true,
        popupName: "warning",
        title: "Оплачено ✅",
        buttonText: "Закрыть",
        buttonTextDark: true,
        openPremiumPopup: !isPremium,
        openVerifyPopup: isPremium,
      })
    );
  };

  return (
    <BottomSheet
      header={<p className={styles.popup__name}>{title}</p>}
      open={isOpen}
      snapPoints={({ minHeight }) => [minHeight + 48, screen.height]}
      onDismiss={closePopup}
    >
      <section className={styles.popup__section}>
        <p className={styles.input__name}>Сумма вывода:</p>
        <div className={styles.input__wrapper}>
          <input type="text" readOnly defaultValue={inputWithdrawNumber} />
        </div>
        <p className={styles.input__name}>Комиссия:</p>
        <div className={styles.input__wrapper}>
          <input
            type="text"
            readOnly
            defaultValue={inputWithdrawNumber * 0.1}
          />
          <button className={styles.save__data} onClick={commissionPaid}>
            Оплатить
          </button>
        </div>
      </section>
    </BottomSheet>
  );
};
export default Commission;
