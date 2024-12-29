import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { setPopupData } from "../../../../store/slices/popupsSlice";

import storageImg from "../../../../img/icons/storage.svg";
import walletImg from "../../../../img/icons/wallet.svg";
import arrowToLeft from "../../../../img/icons/arrowToLeft.svg";
import arrowToRight from "../../../../img/icons/arrowToRight.svg";

import styles from "./profile.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const { name, username, avatar, memoryAll, memoryUse, balance, maxBalance } =
    useSelector((state) => state.user);

  const showWithdrawPopupUi = () => {
    dispatch(
      setPopupData({ isOpen: true, popupName: "withdraw", title: "Вывод" })
    );
  };

  return (
    <>
      <div className={styles.profile__block}>
        <div className={styles.section__info}>
          <img src={storageImg} alt="" className={styles.section__img} />
        </div>
        <section className={styles.profile__section}>
          <p className={styles.section__name}>Использовано</p>
          <p className={styles.memory__block}>
            <span className={styles.memory__type}>GB {"  "}</span>
            <span className={styles.memory}>
              {Number(memoryUse) > Number(memoryAll)
                ? memoryAll
                : memoryUse.toFixed(3)}
            </span>
          </p>
          <NavLink to="/shop" className={styles.all__memory}>
            {" "}
            <img src={arrowToLeft} alt="" />
            из {memoryAll} GB
          </NavLink>
        </section>
        <div
          className={clsx(
            styles.circle__avatar,
            !avatar && styles.circle__name
          )}
        >
          {!!avatar ? (
            <img src={avatar} alt="" className={styles.avatar} />
          ) : (
            <p>{name.slice(0, 1)}</p>
          )}
        </div>
        <section
          className={clsx(styles.profile__section, styles.balance__section)}
        >
          <p className={styles.section__name}>Заработано</p>
          <p className={styles.balance__block}>
            <span className={styles.balance}>
              {Number(balance) > Number(maxBalance)
                ? maxBalance
                : balance.toFixed(2)}{" "}
            </span>{" "}
            <span className={styles.balance__type}>₽</span>
          </p>
          <p className={styles.withdraw} onClick={showWithdrawPopupUi}>
            Вывести <img src={arrowToRight} alt="" />
          </p>
        </section>
        <div className={styles.section__info}>
          <img src={walletImg} alt="" className={styles.section__img} />
        </div>
      </div>
      <p className={styles.profile__name}>{name}</p>
      <p className={styles.profile__username}>{username}</p>
    </>
  );
};
export default Profile;
