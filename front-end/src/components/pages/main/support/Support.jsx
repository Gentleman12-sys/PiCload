import Contact from "./contact/Contact";
import telegramImage from "../../../../img/icons/telegramLink.svg";
import vkImage from "../../../../img/icons/VKlink.svg";
import mailImage from "../../../../img/icons/maillink.svg";
import telegramLogo from "../../../../img/icons/telegramLogo.svg";
import vkLogo from "../../../../img/icons/vklogo.svg";
import mailLogo from "../../../../img/icons/maillogo.svg";

import styles from "./support.module.scss";

const Support = () => {
  return (
    <section className={styles.support__section}>
      <p className={styles.section__name}>Контакты поддержки ☎️</p>
      <p className={styles.section__description}>
        Поможем в любой ситуации и на связи 24/7
      </p>
      <div className={styles.contacts}>
        <Contact
          name="Ответим вам в Telegram"
          description="Через нашего бота"
          image={telegramImage}
          buttonImage={telegramLogo}
          link=''
        />
        <Contact
          name="Найдите ответы сами"
          description="В нашей группе Вконтакте"
          image={vkImage}
          buttonImage={vkLogo}
          link=''
        />
        <Contact
          name="Напишите на почту"
          description="Мы ответим в течении часа"
          image={mailImage}
          buttonImage={mailLogo}
          link=''
        />
      </div>
    </section>
  );
};
export default Support;
