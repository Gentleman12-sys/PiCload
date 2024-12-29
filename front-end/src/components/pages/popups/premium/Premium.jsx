import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import { setClosePopup } from "../../../../store/slices/popupsSlice";

import Button from "../../../ui/button/Button";

import styles from "../warning/warning.module.scss";

const Premium = ({ isOpen }) => {
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(setClosePopup());
  };

  return (
    <BottomSheet
      header={<p className={styles.warn__title}>Информация</p>}
      open={isOpen}
      snapPoints={({ minHeight }) => [minHeight + 24, screen.height]}
      onDismiss={closePopup}
    >
      <p className={styles.warn__description}>
        Ваши средства <span className={styles.green__span}>успешно</span>
        выведены на рублёвый баланс в приложении, для моментального вывода вам
        нужно иметь <span className={styles.blue__span}>Премиум статус</span>
      </p>
      <div className={styles.buttons__wrapper}>
        <NavLink to="/shop" onClick={closePopup}>
          <Button text="В магазин" componentStyle="close__button" />
        </NavLink>
      </div>
    </BottomSheet>
  );
};

export default Premium;
