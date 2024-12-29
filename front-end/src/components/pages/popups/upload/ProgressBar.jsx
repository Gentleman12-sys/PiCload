import { useState, useEffect } from "react";
import { getRandomNumber } from "../../../../helpers/helpers";

import styles from "./upload.module.scss";

const ProgressBar = ({ seconds }) => {
  const generateRandomNumbers = () => {
    let num1 = getRandomNumber(1, 33);
    let num2 = getRandomNumber(34, 66);
    let num3 = getRandomNumber(67, 99);
    return [1, num1, num2, num3, 100].sort((a, b) => a - b);
  };

  const [progressValues, setProgressValues] = useState(generateRandomNumbers);
  const [currentProgress, setCurrentProgress] = useState(1); // Начало с 1
  const [targetProgress, setTargetProgress] = useState(progressValues[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex >= 100) {
          clearInterval(interval);
          return 100;
        }
        return (prevIndex + 1) % 5;
      });
    }, seconds);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newTarget = progressValues[index];
    if (newTarget > currentProgress) {
      setTargetProgress(newTarget);
    }
  }, [index, progressValues, currentProgress]);

  useEffect(() => {
    const smoothTransition = setInterval(() => {
      setCurrentProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(smoothTransition)
          return 100
        }
        if (prevProgress < targetProgress) {
          return Math.min(prevProgress + 1, targetProgress);
        }
        return prevProgress;
      });
    }, 10);

    return () => clearInterval(smoothTransition);
  }, [targetProgress]);

  return (
    <div className={styles.progress__wrapper}>
      <p>{currentProgress}%</p>
      <div className={styles.progress__container}>
        <div
          className={styles.progress__bar}
          style={{ width: `${currentProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
