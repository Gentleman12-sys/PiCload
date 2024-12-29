import styles from "./upload.module.scss";

const ImagePreview = ({ data, setUploadedImages }) => {
  const removeImageFromUpload = () => {
    setUploadedImages((prev) => prev.filter((el) => el.imageId !== data.imageId));
  };

  return (
    <div className={styles.image__preview}>
      <div className={styles.preview__data}>
        <img src={data.imageSrc} alt="uploadingImg" />
        <div>
          <p>{data.imageName}</p>
          <p>{(data.imageSize * 1024).toFixed(2)} MB</p>
        </div>
      </div>
      <button onClick={removeImageFromUpload}>
        <span>+</span>
      </button>
    </div>
  );
};

export default ImagePreview;
