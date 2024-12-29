import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BottomSheet } from "react-spring-bottom-sheet";
import clsx from "clsx";

import { addBalanceAndCatCount } from "../../../../store/slices/userSlice";
import {
  setClosePopup,
  setPopupData,
} from "../../../../store/slices/popupsSlice";

import {
  getErrorMessage,
  sendImages,
  updateBonusesDataS,
} from "../../../../api/requests";

import { getRandomNumber } from "../../../../helpers/helpers";

import ImageUploading from "./ImageUploading";
import ImageManager from "./ImageManager";
import ProgressBar from "./ProgressBar";

import styles from "./upload.module.scss";

const Upload = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { title, popupEmoji, emojiBackground, categoryName } = useSelector(
    (state) => state.popups
  );
  const { userId, errorPercent, isPremium, memoryAll } = useSelector(
    (state) => state.user
  );
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showProgress, setShowProgress] = useState(null);

  const resetUploadProcess = () => {
    setUploadedImages([]);
    setShowProgress(false);
  };
  
  const sendImagesFunc = () => {
    const imagesArrayToSend = uploadedImages.map((el) => {
      return {
        size: Number(el.imageSize),
        price: Number(el.imagePrice),
      };
    });
    const imagePriceSum = imagesArrayToSend.reduce(
      (sum, item) => sum + item.price,
      0
    );
    const imageSizeSum = imagesArrayToSend.reduce(
      (sum, item) => sum + item.size,
      0
    );
    sendImages(userId, imagesArrayToSend, categoryName).then(() => {
      updateBonusesDataS(userId).then(() => {
        setTimeout(
          () => {
            dispatch(
              setPopupData({
                isOpen: true,
                popupName: "warning",
                title: "Успешно ✅",
                text: `Ваши изображении были приняты. На ваш баланс было начислено ${imagePriceSum.toFixed(
                  2
                )} ₽`,
                buttonText: "Закрыть",
                buttonTextDark: true,
              })
            );
            dispatch(
              addBalanceAndCatCount({
                balanceToAdd: imagePriceSum,
                catName: categoryName,
                imagesCount: imagesArrayToSend.length,
                imagesSizeToAdd: imageSizeSum,
              })
            );
            resetUploadProcess();
          },
          isPremium ? 2125 : 8000
        );
      });
    });
  };

  const checkAvailabilityUploadingImage = () => {
    if (
      uploadedImages.reduce((sum, el) => sum + el.imageSize * 1024, 0) >=
      memoryAll * 1000
    ) {
      dispatch(
        setPopupData({
          isOpen: true,
          popupName: "warning",
          title: "Отклонено ❌",
          text: "Вес картинок превышает объем вашего хранилища.",
          buttonText: "Закрыть",
        })
      );
      resetUploadProcess();
      return;
    }
    if (Number(errorPercent) < 1) {
      sendImagesFunc();
    } else {
      const randomNumber = getRandomNumber(0, 100);
      if (randomNumber < Number(errorPercent)) {
        getErrorMessage().then((res) => {
          setTimeout(() => {
            dispatch(
              setPopupData({
                isOpen: true,
                popupName: "warning",
                title: "Отклонено ❌",
                text: "Ваше изображение не было принято по следующей причине:",
                rejectText: res.data.message,
                buttonText: "Закрыть",
                buttonTextDark: true,
              })
            );
            resetUploadProcess();
          }, 8000);
        });
      } else {
        sendImagesFunc();
      }
    }
    setShowProgress(true);
  };

  const closePopup = () => {
    dispatch(setClosePopup());
    resetUploadProcess();
  };

  return (
    <BottomSheet
      open={isOpen}
      snapPoints={({ minHeight }) => [minHeight + 48, screen.height]}
      onDismiss={closePopup}
    >
      <div className={clsx(styles.emoji__wrapper, styles[emojiBackground])}>
        <img src={popupEmoji} alt="" />
      </div>
      <p className={styles.popup__title}>{title}</p>
      {uploadedImages.length === 0 && !showProgress && (
        <ImageUploading
          resetUploadProcess={resetUploadProcess}
          setUploadedImages={setUploadedImages}
        />
      )}
      {uploadedImages.length !== 0 && !showProgress && (
        <ImageManager
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
          checkAvailabilityUploadingImage={checkAvailabilityUploadingImage}
        />
      )}
      {showProgress && <ProgressBar seconds={isPremium ? 500 : 2000} />}
    </BottomSheet>
  );
};

export default Upload;
