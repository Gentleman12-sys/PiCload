import { useRef } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";

import {
  getRandomFloatNumber,
  parseTwoNumbers,
} from "../../../../helpers/helpers";

import uploadIcon from "../../../../img/icons/uploadIcon.svg";

import styles from "./upload.module.scss";
import Button from "./../../../ui/button/Button";
import { useSelector } from "react-redux";

const ImageUploading = ({ setUploadedImages, resetUploadProcess }) => {
  const hiddenInputRef = useRef(null);

  const { picPay, picSize } = useSelector((state) => state.user);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (incomingFiles) => {
      if (incomingFiles.length > 10) {
        alert("Максимальное количество картинок которые можете загрузить: 10");
        resetUploadProcess();
        return;
      }
      getImagesFromInput(incomingFiles);
    },
  });

  const getImagesFromInput = (fileArray) => {
    fileArray.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const [size1, size2] = parseTwoNumbers(picSize);
        const [pay1, pay2] = parseTwoNumbers(picPay);
        setUploadedImages((prev) => [
          ...prev,
          {
            imageId: index,
            imageSrc: e.target.result,
            imageName: file.name,
            imageSize: Number(
              (
                getRandomFloatNumber(Number(size1), Number(size2)) / 1024
              ).toFixed(3)
            ),
            imagePrice: Number(
              getRandomFloatNumber(Number(pay1), Number(pay2)).toFixed(2)
            ),
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const onButtonClick = () => {
    hiddenInputRef.current.click();
  };

  return (
    <section className={styles.popup__content}>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={clsx(
          styles.uploader,
          isDragActive && styles.uploader__active
        )}
      >
        <img src={uploadIcon} alt="uploadIcon" />
        <div>Перетащите сюда файлы</div>
        <p>Или</p>
        <Button
          text="Выбрать с устройства"
          componentStyle="dark__button"
          onClick={onButtonClick}
        />
        <input
          type="file"
          style={{ opacity: 0 }}
          {...getInputProps()}
          ref={hiddenInputRef}
          multiple
        />
      </div>
    </section>
  );
};

export default ImageUploading;
