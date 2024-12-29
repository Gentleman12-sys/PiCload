import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BottomSheet } from "react-spring-bottom-sheet";

import {
  setInputCardNumber,
  setInputWithdrawNumber,
} from "../../../../store/slices/withdrawSlice";

import styles from "./withdraw.module.scss";
import {
  setClosePopup,
  setPopupData,
} from "../../../../store/slices/popupsSlice";

const Withdraw = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { quantityOfPictures, balance } = useSelector((state) => state.user);
  const { title } = useSelector((state) => state.popups);
  const { inputCardNumber, inputWithdrawNumber } = useSelector(
    (state) => state.withdraw
  );
  const [selectValue, setSelectValue] = useState("Банковская карта РФ");

  const handleCardNumberChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    const formattedValue = digits.replace(/(.{4})/g, "$1 ").trim();
    dispatch(setInputCardNumber(formattedValue));
  };

  const handleWithdrawNumberChange = (e) => {
    dispatch(setInputWithdrawNumber(e.target.value));
  };

  const withdrawMoney = () => {
    if (Number(balance) < Number(inputWithdrawNumber)) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "warning",
          title: "Вывод",
          text: "Сумма вывода превышает Ваш баланс!",
          buttonText: "Закрыть",
        })
      );
      return;
    }
    if (Number(inputWithdrawNumber) < 3000) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "warning",
          title: "Вывод",
          text: "Минимальная сумма вывода 3000р",
          buttonText: "Закрыть",
        })
      );
      return;
    }
    if (quantityOfPictures < 30) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "warning",
          title: "Вывод",
          text: "Для вывода необходимо иметь 30 загруженных фотографий",
          buttonText: "Закрыть",
        })
      );
      return;
    }
    dispatch(
      setPopupData({
        isOpen: true,
        popupName: "warning",
        title: "Почти готово ✅",
        text: "Ваши средства находятся на стоковом сайте. Для их вывода необходимо оплатить комиссию обменников за конвертацию USD в RUB Это комиссия обменников",
        buttonText: "Далее",
      })
    );
  };

  const closePopup = () => {
    dispatch(setClosePopup());
  };

  const changeSelectValue = (e) => setSelectValue(e.target.value);

  return (
    <BottomSheet
      header={<p className={styles.popup__name}>{title}</p>}
      open={isOpen}
      snapPoints={({ minHeight }) => [minHeight + 48, screen.height]}
      onDismiss={closePopup}
    >
      <section className={styles.popup__section}>
        <p className={styles.input__name}>Направление:</p>
        <div className={styles.input__wrapper}>
          <select value={selectValue} onChange={changeSelectValue}>
            <option value="Банковская карта РФ">Банковская карта РФ</option>
            <option value="СБП">СБП</option>
            <option value="Юмани">Юмани</option>
            <option value="Банковская карта (Другие страны)">
              Банковская карта (Другие страны)
            </option>
          </select>
        </div>
        <p className={styles.input__name}>Сумма</p>
        <div className={styles.input__wrapper}>
          <input
            type="text"
            value={inputWithdrawNumber}
            onChange={handleWithdrawNumberChange}
            placeholder="3000.00"
          />
        </div>
        <p className={styles.input__name}>Реквизиты</p>
        <div className={styles.input__wrapper}>
          <input
            type="text"
            value={inputCardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            placeholder={
              selectValue === "Банковская карта РФ" ||
              selectValue === "Банковская карта (Другие страны)"
                ? "XXXX XXXX XXXX XXXX"
                : (selectValue === "СБП" || selectValue === "Юмани") &&
                  "+7 (123) 456 78-91"
            }
          />
          <button
            className={styles.save__data}
            disabled={
              inputWithdrawNumber === "" || inputCardNumber?.length !== 19
            }
            onClick={withdrawMoney}
          >
            Вывести
          </button>
        </div>
      </section>
    </BottomSheet>
  );
};
export default Withdraw;
