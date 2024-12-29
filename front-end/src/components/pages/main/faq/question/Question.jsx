import React, { useState } from "react";
import openQuestion from "../../../../../img/icons/openArrow.svg";
import styles from "./question.module.scss";

const Question = ({ question,answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAnswer = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <section className={styles.question} onClick={openAnswer}>
      <div className={styles.question__info}>
        <p className={styles.question__name}>{question}</p>
        <img
          src={openQuestion}
          alt=""
          className={styles.open__question}
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }} 
        />
      </div>
      <div
        className={styles.answer}
        style={{
          height: isOpen ? "100px" : "0",
          overflow: "hidden", 
          transition: "height 0.3s ease-in-out" 
        }}
      >
        {isOpen && (
        <p>{answer}</p>
        )}
      </div>
    </section>
  );
};

export default Question;