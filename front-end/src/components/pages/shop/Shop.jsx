import ShopProducts from "./shop-products/Shop-products";

import shopBanner from "../../../img/banners/shopBanner.png";

import styles from "./shop.module.scss";

const Shop = () => {
  return (
    <section className={styles.shop__page}>
      <div className={styles.banner__wrapper}>
        <p className={styles.page__name}>Магазин</p>
        <p className={styles.page__description}>
          Приобретите <span>премиум-функции</span> или увеличьте свое хранилище
          изображений
        </p>
        <img src={shopBanner} alt="" className={styles.page__banner} />
      </div>

      <section className={styles.shop__categories}>
        <ShopProducts
          categoryName="Улучшение аккаунта"
          categoryDescription="Больше возможностей"
          premiumCategory={true}
        />
        <ShopProducts
          categoryName="Хранение изображений"
          categoryDescription="Увеличение пространства"
          premiumCategory={false}
        />
      </section>
    </section>
  );
};
export default Shop;
