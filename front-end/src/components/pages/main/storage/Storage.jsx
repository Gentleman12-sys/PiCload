import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./storage.module.scss";
import clsx from "clsx";

const Storage = () => {
  const { memoryAll, memoryUse } = useSelector((state) => state.user);

  const getPercentOfNumbers = (first, second) => {
    return Number(((second / first) * 100).toFixed(0));
  };

  const percentOfMemory = getPercentOfNumbers(memoryAll, memoryUse);

  return (
    <section className={styles.storage__section}>
      <p className={styles.section__name}>Ваше хранилище 💾</p>
      <p className={styles.section__description}>
        Проверьте доступность хранения фотографий
      </p>
      <div className={styles.progress__bar}>
        <div
          className={styles.progress}
          style={{
            width: `${percentOfMemory >= 100 ? 100 : percentOfMemory}%`,
          }}
        >
          <p
            className={clsx(
              styles.memory__percent,
              percentOfMemory >= 10 && styles.greater__than__ten
            )}
          >
            {percentOfMemory >= 95 && "⚠️"}
            {percentOfMemory >= 100 ? 100 : percentOfMemory}%
          </p>
        </div>
      </div>
      <div className={styles.other__info}>
        <div className={styles.other__memory__info}>
          <p className={styles.memory__info}>
            Занято{" "}
            <span>
              {Number(memoryUse) >= Number(memoryAll)
                ? memoryAll
                : memoryUse.toFixed(3)}{" "}
              GB
            </span>{" "}
            из <span>{memoryAll} GB</span>
          </p>
        </div>
        <NavLink to="/shop" className={styles.upgrade__button}>
          Улучшить
        </NavLink>
      </div>
    </section>
  );
};
export default Storage;
