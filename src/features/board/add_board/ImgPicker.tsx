import React from "react";
import { BsCheckLg } from "react-icons/bs";
import styles from "./AddBoard.module.css";

interface ImgPickerProps {
  img: string;
  selectedImg: string;
  selectBg: (src: string, isImg: boolean) => void;
}

const ImgPicker: React.FC<ImgPickerProps> = ({
  img,
  selectedImg,
  selectBg,
}) => {
  const imgUrl = "img/" + img;
  return (
    <div
      className={styles.img_picker}
      style={{ backgroundImage: `url(${imgUrl})` }}
      onClick={() => selectBg(img, true)}
    >
      {img === selectedImg && <BsCheckLg></BsCheckLg>}
    </div>
  );
};

export default ImgPicker;
