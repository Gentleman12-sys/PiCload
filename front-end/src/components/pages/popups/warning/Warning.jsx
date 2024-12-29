import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import {
  setClosePopup,
  setNextPopup,
  setPopupData,
} from "../../../../store/slices/popupsSlice";

import Button from "../../../ui/button/Button";

import styles from "./warning.module.scss";

const Warning = ({ isOpen }) => {
  const dispatch = useDispatch();

  const { isPremium } = useSelector((state) => state.user);

  const {
    title,
    text,
    rejectText,
    subtext,
    buttonText,
    linkText,
    buttonTextDark,
    openPremiumPopup,
    openWithdrawPopup,
    openVerifyPopup,
  } = useSelector((state) => state.popups);

  const [popupStepCounter, setPopupStepCounter] = useState(0);

  useEffect(() => {
    if (popupStepCounter === 1) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "warning",
          title: "Информация о комиссии",
          subtext: "Комиссия обменников составляет 10%",
          text: "Комиссия необходима для перевода средств с американского стокового сайта на рублевый счет",
          buttonText: "Далее",
        })
      );
    } else if (popupStepCounter === 2) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "commission",
          title: "Оплата комиссии",
        })
      );
    }
  }, [popupStepCounter]);

  const closePopup = () => {
    const openPremiumPopupToUse = openPremiumPopup;
    const openVerifyPopupToUse = openVerifyPopup;
    dispatch(setClosePopup());
    setPopupStepCounter(0);
    if (openPremiumPopupToUse && !isPremium) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "premium",
          title: "Информация",
        })
      );
      return;
    }
    if (openVerifyPopupToUse && isPremium) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "warning",
          title: "Верификация",
          text: "Проходите верификацию",
          buttonText: "Пройти"
        })
      );
      return;
    }
  };

  const nextPopup = () => {
    dispatch(setNextPopup());
    setPopupStepCounter((prev) => prev + 1);
  };

  const subtextMain = subtext ? subtext.slice(0, -3) : "";
  const subtextLastThree = subtext ? subtext.slice(-3) : "";

  const btnOnClick = () => {
    if (buttonText === "Далее") {
      nextPopup();
    } else if (buttonText === "Вывод") {
      if (openWithdrawPopup) {
        dispatch(
          setPopupData({ isOpen: true, popupName: "withdraw", title: "Вывод" })
        );
      }
    } else {
      closePopup();
    }
  };

  return (
    <BottomSheet
      header={<p className={styles.warn__title}>{title}</p>}
      open={isOpen}
      snapPoints={({ minHeight }) => [minHeight + 24, screen.height]}
      onDismiss={closePopup}
    >
      {!!subtext && (
        <p className={styles.warn__subtext}>
          {subtextMain}
          <span>{subtextLastThree}</span>
        </p>
      )}
      {!!text && <p className={styles.warn__description}>{text}</p>}
      {!!rejectText && (
        <p className={styles.warn__rejected_message}>«{rejectText}»</p>
      )}
      <div className={styles.buttons__wrapper}>
        <Button
          text={buttonText}
          componentStyle={buttonTextDark ? "dark__button" : "close__button"}
          onClick={btnOnClick}
        />
        {!!linkText && (
          <NavLink to="/shop" onClick={closePopup}>
            <Button
              text={linkText}
              componentStyle={buttonTextDark && "close__button"}
            />
          </NavLink>
        )}
      </div>
    </BottomSheet>
  );
};

export default Warning;
