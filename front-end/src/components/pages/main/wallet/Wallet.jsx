import { useDispatch, useSelector } from "react-redux";

import styles from "./wallet.module.scss";
import { setPopupData } from "../../../../store/slices/popupsSlice";

const Wallet = () => {
  const dispatch = useDispatch();
  const { balance, income, maxBalance } = useSelector((state) => state.user);

  const showWithdrawPopupUi = () => {
    dispatch(
      setPopupData({ isOpen: true, popupName: "withdraw", title: "Вывод" })
    );
  };

  const [number, decimals] = balance.toFixed(2).split(".");

  return (
    <section className={styles.wallet__section}>
      <p className={styles.section__name}>Доступный баланс 💰</p>
      <p className={styles.section__description}>
        Доступный баланс и вывод средств
      </p>
      <div className={styles.wallet__wrapper}>
        <div className={styles.money__info}>
          <p className={styles.money}>
            {Number(number) >= Number(maxBalance) ? maxBalance : number}
            <span className={styles.decimals}>
              .{Number(number) >= Number(maxBalance) ? "00" : decimals}
              <span className={styles.ruble}>₽</span>
            </span>
          </p>
          <p className={styles.income}>
            <span>
              +₽
              {Number(income) >= Number(maxBalance)
                ? maxBalance
                : income.toFixed(2)}
            </span>{" "}
            за последние 7 дней
          </p>
        </div>
        <div className={styles.button__wrapper}>
          <button className={styles.withdraw} onClick={showWithdrawPopupUi}>
            Вывести
          </button>
        </div>
      </div>
    </section>
  );
};
export default Wallet;
