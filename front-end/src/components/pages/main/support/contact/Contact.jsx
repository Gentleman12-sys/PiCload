import Button from "../../../../ui/button/Button";

import styles from "./contact.module.scss";

const Contact = ({ name, description, image, buttonImage, link }) => {
  return (
    <div className={styles.contact}>
      <img src={image} alt="" className={styles.contact__img} />
      <div className={styles.contact__info}>
        <p className={styles.contact__name}>{name}</p>
        <p className={styles.contact__description}>{description}</p>
      </div>
      <div className={styles.button__wrapper}>
        <a href={link} target="blank">
          <Button image={buttonImage} componentStyle="contact__button" />
        </a>
      </div>
    </div>
  );
};
export default Contact;
