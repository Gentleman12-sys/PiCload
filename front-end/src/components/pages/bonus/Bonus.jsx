import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserBonus from "./userBonus/User-bonus";

import {
  checkGroupMember,
  getUserBonuses,
  updateBonusesDataS,
} from "../../../api/requests";

import downloadLogo from "../../../img/icons/copy.svg";
import telegramLogo from "../../../img/icons/telegramLogo.svg";
import refreshIcon from "../../../img/icons/refreshIcon.svg";

import styles from "./bonus.module.scss";
import Button from "../../ui/button/Button";
import Loading from "../../ui/loading/Loading";

const Bonus = () => {
  const { userId, referrerCount, rewardByMember } = useSelector(
    (state) => state.user
  );
  const [bonusesData, setBonusesData] = useState([]);

  const getBonusesData = () => {
    updateBonusesDataS(userId).then(() => {
      getUserBonuses(userId).then((res) => setBonusesData(res.data));
    });
  };

  useEffect(() => {
    getBonusesData();
  }, []);

  return (
    <section className={styles.bonus__page}>
      <div className={styles.page__preview}>
        <p className={styles.page__title}>Бонусы</p>
        <p className={styles.page__description}>
          Выполняйте задания и получайте вознаграждения
        </p>
      </div>
      <div className={styles.bonuses}>
        <UserBonus
          bonusState={rewardByMember}
          bonusReward={100}
          bonusName="Подпишитесь на наш канал"
          bonusDescription="Подпишитесь на наш канал в [название платформы] и получите 100 рублей на счет!"
          buttonImage={telegramLogo}
          bonusLink="https://t.me/picload"
        />
        <UserBonus
          bonusState={referrerCount >= 1}
          bonusType="count"
          counter={referrerCount}
          bonusAsk="присоединились по вашей ссылке"
          bonusReward={"∞"}
          buttonImage={downloadLogo}
          bonusName="Поделитесь с друзьями"
          textToCopy={`https://t.me/@besting_bestbot?start=${userId}`}
          bonusDescription="Поделитесь своей реферальной ссылкой в социальных сетях и получите 450 рублей за каждого приглашенного друга."
        />
        {bonusesData?.length === 0 ? (
          <Loading halfheight={true} />
        ) : (
          bonusesData?.map((el, i) => (
            <UserBonus
              key={i}
              buttonHide={true}
              bonusState={el?.success}
              bonusReward={Number(el?.price)}
              bonusName={el?.name}
              bonusDescription={el?.description}
            />
          ))
        )}
      </div>
    </section>
  );
};
export default Bonus;
