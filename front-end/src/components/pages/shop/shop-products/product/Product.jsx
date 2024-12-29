import { useDispatch } from "react-redux";
import clsx from "clsx";

import { setPopupData } from "../../../../../store/slices/popupsSlice";

import styles from "./product.module.scss";

const Product = ({
  premiumProduct,
  productName,
  productDescription,
  productPrice,
  productText,
  productStorage
}) => {
  const dispatch = useDispatch();
  const openDetails = () => {
    dispatch(
      setPopupData({
        isOpen: true,
        popupName: "upgrade",
        title: productName,
        productPrice: productPrice,
        productStorageCount: productStorage,
        text: productText,
      })
    );
  };

  return (
    <div
      className={clsx(
        styles.product,
        premiumProduct ? styles.premium__background : null
      )}
      onClick={openDetails}
    >
      <div className={styles.product__text}>
        <p className={styles.product__name}>
          {premiumProduct ? "💎" : "📦"}{" "}
          <span className={premiumProduct ? styles.premium__title : null}>
            {productName}
          </span>
        </p>
        <p className={styles.product__description}>{productDescription}</p>
      </div>
      <p className={styles.product__price}>{productPrice}</p>
    </div>
  );
};
export default Product;
