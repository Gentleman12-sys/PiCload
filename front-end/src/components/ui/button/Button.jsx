import styles from "./button.module.scss";

import clsx from "clsx";

const Button = ({ image, text, componentStyle, onClick = () => null, onTouchStart = () => null }) => {
  return (
    <button className={clsx(styles[componentStyle])} onClick={onClick} onTouchStart={onTouchStart}>
      {!!image && <img src={image} alt="" className={styles.button__img} />}
      {!!text && <p className={clsx(styles[componentStyle])}>{text}</p>}
    </button>
  );
};
export default Button;
