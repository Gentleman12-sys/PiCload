import ImagePreview from "./ImagePreview";
import Button from "../../../ui/button/Button";

import styles from "./upload.module.scss";

const ImageManager = ({
  uploadedImages,
  setUploadedImages,
  checkAvailabilityUploadingImage,
}) => {
  return (
    <section className={styles.image__manager}>
      <p>Выбрано {uploadedImages.length} файла</p>
      <div className={styles.images__wrapper}>
        {uploadedImages.map((el, i) => (
          <ImagePreview key={i} data={el} setUploadedImages={setUploadedImages} />
        ))}
      </div>
      <Button
        text="Продолжить"
        componentStyle="close__button"
        onClick={checkAvailabilityUploadingImage}
      />
    </section>
  );
};

export default ImageManager;
