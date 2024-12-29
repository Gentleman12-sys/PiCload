import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { setPopupData } from "../../../../store/slices/popupsSlice";
import { checkGroupMember } from "../../../../api/requests";

import Button from "../../../ui/button/Button";

import openAsk from "../../../../img/icons/openArrow.svg";

import styles from "./user-bonus.module.scss";
import { setMemberStatus } from "../../../../store/slices/userSlice";

const UserBonus = ({
  bonusState,
  bonusReward,
  bonusName,
  bonusDescription,
  bonusLink,
  buttonImage,
  bonusType,
  counter,
  bonusAsk,
  buttonHide,
  textToCopy,
}) => {
  const dispatch = useDispatch();
  const { userId, rewardByMember } = useSelector((state) => state.user);
  const onButtonClick = () => {
    if (!!textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "warning",
          title: "Уведомление",
          text: "Ссылка была скопирована в буфер обмена",
          buttonText: "Закрыть",
        })
      );
    }
  };

  const checkMemberStatus = () => {
    if (rewardByMember) return;
    const intervalRequest = setInterval(() => {
      checkGroupMember(userId).then((res) => {
        if (res.data === "member") {
          clearInterval(intervalRequest);
          dispatch(setMemberStatus(true));
          return;
        }
      });
    }, 2000);
    setTimeout(() => clearInterval(intervalRequest), 30000);
    window.location.href = bonusLink;
  };

  return (
    <section className={styles.bonus}>
      <div className={styles.bonus__top}>
        <div
          className={clsx(
            styles.bonus__state,
            bonusState ? styles.completed : styles.not__completed
          )}
        >
          {bonusState ? "🔥 Выполнено" : "⏳ Не выполнено"}
        </div>
        <div className={styles.line}></div>
        <div className={styles.bonus__reward}>
          {typeof bonusReward === "number"
            ? bonusReward.toFixed(0)
            : bonusReward}{" "}
          ₽
        </div>
      </div>
      <section className={styles.bonus__info}>
        <div className={styles.bonus__text}>
          <p className={styles.bonus__name}>{bonusName}</p>
          <p className={styles.bonus__description}>{bonusDescription}</p>
        </div>
        {!buttonHide &&
          (!!bonusLink ? (
            // <a href={bonusLink} target="_blank">
            <Button
              image={buttonImage}
              componentStyle="bonus__button"
              onClick={checkMemberStatus}
            />
          ) : (
            <Button
              image={buttonImage}
              componentStyle="bonus__button"
              onClick={onButtonClick}
            />
          ))}
      </section>
      {bonusType == "count" && (
        <div className={styles.bonus__ask}>
          <p className={styles.ask}>
            <span>{counter}</span> {bonusAsk}
          </p>
        </div>
      )}
    </section>
  );
};
export default UserBonus;
