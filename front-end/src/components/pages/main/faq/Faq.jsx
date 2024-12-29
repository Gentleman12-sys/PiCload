import { useState } from "react";

import Question from "./question/Question";

import styles from "./faq.module.scss";

const Faq = () => {
  const [openAnswer, setOpenAnswer] = useState(null);

  const handleOpenAnswer = (id) => {
    setOpenAnswer(id);
  };

  return (
    <section className={styles.faq__section}>
      <p className={styles.section__name}>Часто задаваемые вопросы ☎️</p>
      <p className={styles.section__description}>
        Найдите для себя решение задач
      </p>
      <div className={styles.questions}>
        <Question
          question={
            <span>
              Как <span className={styles.withdraw}>вывести</span> средства?
            </span>
          }
        />
        <Question
          question={
            <span>
              Зачем оплачивать
              <span className={styles.comission}> комиссию</span>?
            </span>
          }
        />
        <Question
          question={
            <span>
              <span className={styles.where}>Куда</span> загружаются средства?
            </span>
          }
        />
      </div>
    </section>
  );
};
export default Faq;
