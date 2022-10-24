import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import BoardPreview from "../../../assets/img/board_preview.png";
import styles from "./AddBoard.module.css";
import ImgPicker from "./ImgPicker";

export const BackgroundSelector = () => {
  const [selectedColor, setSelectedColor] = useState<string>("#0079BF");
  const [selectedImg, setSelectedImg] = useState<string>("");

  const selectBg = (src: string, isImg: boolean) => {
    if (isImg) {
      setSelectedImg(src);
      setSelectedColor("");
    } else {
      setSelectedImg("");
      setSelectedColor(src);
    }
  };
  return (
    <div className={styles.background_selector}>
      <div className={styles.preview}>
        <img src={BoardPreview} alt="" />
      </div>
      <div className={styles.selector}>
        <h5>Background</h5>
        <div className={styles.selector__img}>
          <ImgPicker
            img={"bg_castle"}
            selectedImg={selectedColor}
            selectBg={setSelectedColor}
          ></ImgPicker>
          <ImgPicker
            img={"bg_mountain"}
            selectedImg={selectedColor}
            selectBg={setSelectedColor}
          ></ImgPicker>
          <ImgPicker
            img={"#bg_purple"}
            selectedImg={selectedColor}
            selectBg={setSelectedColor}
          ></ImgPicker>
          <ImgPicker
            img={"#bg_sand"}
            selectedImg={selectedColor}
            selectBg={setSelectedColor}
          ></ImgPicker>
        </div>
        <div className={styles.selector__colors}>
          <ColorPicker
            color={"#0079BF"}
            selectedColor={selectedColor}
            selectBg={selectBg}
          ></ColorPicker>
          <ColorPicker
            color={"#D29034"}
            selectedColor={selectedColor}
            selectBg={selectBg}
          ></ColorPicker>
          <ColorPicker
            color={"#519839"}
            selectedColor={selectedColor}
            selectBg={selectBg}
          ></ColorPicker>
          <ColorPicker
            color={"#b04632"}
            selectedColor={selectedColor}
            selectBg={selectBg}
          ></ColorPicker>
          <ColorPicker
            color={"#89609E"}
            selectedColor={selectedColor}
            selectBg={selectBg}
          ></ColorPicker>
          <ColorPicker
            color={"#CD5A91"}
            selectedColor={selectedColor}
            selectBg={selectBg}
          ></ColorPicker>
        </div>
      </div>
    </div>
  );
};
