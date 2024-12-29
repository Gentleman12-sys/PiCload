import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendPromocode } from "../../../../api/requests";
import { setPopupData } from "../../../../store/slices/popupsSlice";

import styles from "./promocode.module.scss";
import { getUserBalance } from "../../../../helpers/helpers";

const Promocode = () => {
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");

  const { userId } = useSelector((state) => state.user);

  const sendPromo = () => {
    sendPromocode(userId, promoCode).then(
      ({ data: { success = null, error = "" } }) => {
        dispatch(
          setPopupData({
            isOpen: true,
            popupName: "warning",
            title: "Уведомление",
            text:
              success === null
                ? "Повторите попытку, пожалуйста, чуть позже!"
                : `${success ? "Промокод активирован! ✅" : `${error}❌`}`,
            buttonText: "Закрыть",
          })
        );
        getUserBalance(userId, dispatch);
        setPromoCode("");
      }
    );
  };

  return (
    <section className={styles.promocode__section}>
      <p className={styles.section__name}>Промокод 🎁</p>
      <p className={styles.section__description}>
        Для получения некоторых бонусов
      </p>
      <div className={styles.input__wrapper}>
        <input
          type="text"
          placeholder="Введите промокод"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)} // Update state on input change
          maxLength={19}
        />
        <button
          disabled={promoCode.length < 2} // Button disabled based on state
          onClick={sendPromo}
        >
          Ввести
        </button>
      </div>
    </section>
  );
};

export default Promocode;
