import { useDispatch, useSelector } from "react-redux";
import { BottomSheet } from "react-spring-bottom-sheet";

import {
  updateMaxStorageDataS,
  updatePremiumDataS,
} from "../../../../api/requests";

import {
  setClosePopup,
  setPopupData,
} from "../../../../store/slices/popupsSlice";

import Button from "../../../ui/button/Button";

import styles from "./upgrade.module.scss";
import { getUserDataHelper } from "../../../../helpers/helpers";
import Loading from "./../../../ui/loading/Loading";
import { useState } from "react";

const Upgrade = ({ isOpen }) => {
  const dispatch = useDispatch();

  const { title, text, productPrice, productStorageCount } = useSelector(
    (state) => state.popups
  );
  const { userId, isPremium } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const showCompletePopup = (success = true) => {
    getUserDataHelper(userId, dispatch);
    dispatch(
      setPopupData({
        isOpen: true,
        popupName: "warning",
        title: success ? "Оплачено ✅" : "Отклонено ❌",
        text: "",
        buttonText: "Закрыть",
      })
    );
  };
  const updateDataSFunc = () => {
    if (title.toLowerCase().includes("premium") && !isPremium) {
      setLoading(true);
      if (true) {
        updatePremiumDataS(userId).then(() => {
          updateMaxStorageDataS(userId, 15).then((res) => {
            setLoading(false);
            showCompletePopup();
          });
        });
      } else {
        setLoading(false);
        showCompletePopup(false);
      }
    } else {
      setLoading(true);
      if (true) {
        updateMaxStorageDataS(userId, productStorageCount).then((res) => {
          setLoading(false);
          showCompletePopup();
        });
      } else {
        setLoading(false);
        showCompletePopup(false);
      }
    }
  };

  const closePopup = () => {
    dispatch(setClosePopup());
  };

  return (
    <BottomSheet
      header={<p className={styles.warn__title}>{title}⭐️</p>}
      open={isOpen}
      snapPoints={({ minHeight }) => [minHeight + 24, screen.height]}
      onDismiss={closePopup}
    >
      {loading ? (
        <Loading halfheight={true} />
      ) : (
        <>
          <ul className={styles.upgrade__ul}>
            {!!text && text?.split("|").map((el, i) => <li key={i}>{el}</li>)}
          </ul>
          <Button
            text={`Купить за ${productPrice}`}
            componentStyle={"buy__button"}
            onClick={updateDataSFunc}
          />
        </>
      )}
    </BottomSheet>
  );
};
export default Upgrade;
