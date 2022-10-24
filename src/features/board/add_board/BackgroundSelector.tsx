import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import BoardPreview from "../../../assets/img/board_preview.png";
import styles from "./AddBoard.module.css";
import ImgPicker from "./ImgPicker";

export const BackgroundSelector = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImg, setSelectedImg] = useState<string>("bg_castle.jpg");

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
      <div
        className={styles.preview}
        style={{
          backgroundImage: `url(img/${selectedImg})`,
          backgroundColor: selectedColor,
          backgroundRepeat: "noRepeat",
          backgroundSize: "cover",
        }}
      >
        <img src={BoardPreview} alt="" />
      </div>
      <div className={styles.selector}>
        <h5>Background</h5>
        <div className={styles.selector__section}>
          <ImgPicker
            img={"bg_castle.jpg"}
            selectedImg={selectedImg}
            selectBg={selectBg}
          ></ImgPicker>
          <ImgPicker
            img={"bg_mountain.jpg"}
            selectedImg={selectedImg}
            selectBg={selectBg}
          ></ImgPicker>
          <ImgPicker
            img={"bg_purple.jpg"}
            selectedImg={selectedImg}
            selectBg={selectBg}
          ></ImgPicker>
          <ImgPicker
            img={"bg_sand.jpg"}
            selectedImg={selectedImg}
            selectBg={selectBg}
          ></ImgPicker>
        </div>
        <div className={styles.selector__section}>
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
