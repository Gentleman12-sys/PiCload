import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import Category from "./category/Category";

import { setPopupData } from "../../../../store/slices/popupsSlice";
import { countMemoryPercent } from "../../../../helpers/helpers";

import styles from "./categories.module.scss";
import "swiper/css";
import "swiper/css/pagination";

const Categories = () => {
  const dispatch = useDispatch();
  const { balance, maxBalance, memoryAll, memoryUse, categoriesData } =
    useSelector((state) => state.user);

  const showPopup = (popupEmoji, emojiBackground, name) => {
    if (balance >= maxBalance) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "warning",
          title: "Информация",
          text: "Ваш кошелек переполнен, сделайте свой первый вывод, чтобы освободить место",
          buttonText: "Вывод",
          openWithdrawPopup: true,
        })
      );
    } else if (countMemoryPercent(memoryAll, memoryUse) < 5) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "warning",
          title: "Внимание ⚠️",
          text: "Ваше хранилище почти заполнено! Вы можете увеличить его размер в магазине.",
          buttonText: "Закрыть",
          buttonTextDark: true,
          linkText: "Увеличить",
        })
      );
    } else {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "upload",
          popupEmoji: popupEmoji,
          title: "Загрузка медиа",
          buttonText: "Закрыть",
          emojiBackground: emojiBackground,
          categoryName: name,
        })
      );
    }
  };

  return (
    <section className={styles.categories__section}>
      <p className={styles.categories__title}>Загрузите фото 🔥</p>
      <div className={styles.categories__subinfo}>
        <p className={styles.categories__description}>
          Выберите категорию для загрузки
        </p>
      </div>
      <section className={styles.categories}>
        <Swiper
          pagination={true}
          modules={[Pagination]}
          watchSlidesProgress
          slidesPerView={3.5}
          spaceBetween={-10}
        >
          {categoriesData.map((el, i) => (
            <SwiperSlide key={i}>
              <Category
                image={el?.image}
                name={el?.name}
                type={el?.type}
                typeBackground={el?.typeBackground}
                loaded={el?.loaded}
                onClick={() => showPopup(el?.image, el?.type, el?.name)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
};
export default Categories;
