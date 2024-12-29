import { useSelector } from "react-redux";
import Product from "./product/Product";
import styles from "./shop-products.module.scss";

const ShopProducts = ({
  categoryName,
  categoryDescription,
  premiumCategory,
}) => {

  const { isPremium } = useSelector(state => state.user)

  return (
    <>
      {premiumCategory && !isPremium && (
        <section className={styles.category}>
          <p className={styles.section__name}>{categoryName}</p>
          <p className={styles.section__description}>{categoryDescription}</p>
          <div className={styles.products}>
            <Product
              premiumProduct={true}
              productName="Premium"
              productDescription="Вывод средств, ускоренная загрузка, увеличенное хранилище"
              productPrice="399 ₽"
              productText={
                "Моментальный вывод|Увеличенное хранилище 15 GB|Ускоренная загрузка изображений|Отключение рекламы|Эксклюзивные категории"
              }
            />
          </div>
          <div className={styles.line}></div>
        </section>
      )}
      {premiumCategory && (
        <section className={styles.category}>
          <p className={styles.section__name}>{categoryName}</p>
          <p className={styles.section__description}>{categoryDescription}</p>
          <div className={styles.products}>
            <Product
              premiumProduct={false}
              productName="Хранилище 1 GB"
              productDescription="Храните больше изображений"
              productPrice="149 ₽"
              productText={"Увеличение хранилища на 1 GB"}
              productStorage={1}
            />
            <Product
              premiumProduct={false}
              productName="Хранилище 3 GB"
              productDescription="Храните больше изображений"
              productPrice="279 ₽"
              productText={"Увеличение хранилища на 3 GB"}
              productStorage={3}
            />
          </div>
          <div className={styles.line}></div>
        </section>
      )}
    </>
  );
};
export default ShopProducts;
