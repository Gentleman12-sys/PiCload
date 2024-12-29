import clsx from "clsx";
import styles from "./loading.module.scss";

const Loading = ({ halfheight = false }) => {
  return (
    <div
      className={clsx(styles.loading__dots, halfheight && styles.halfheight)}
    >
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default Loading;
