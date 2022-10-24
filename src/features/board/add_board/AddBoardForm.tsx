import React, { useState } from "react";
import { BackgroundSelector } from "./BackgroundSelector";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/user/UserSlice";
import styles from "./AddBoard.module.css";

const AddBoardForm = () => {
  const user = useAppSelector(selectUser);
  const [boardData, setBoardData] = useState({
    title: "",
    bgImg: "",
    bgColor: "",
  });

  const onChangeBackground = (img: string, color: string) => {
    if (img.length > 0) {
      setBoardData({ ...boardData, bgImg: img, bgColor: "" });
    } else {
      setBoardData({ ...boardData, bgImg: "", bgColor: color });
    }
  };

  const handleAddBoard = async () => {
    if (boardData.title.trim().length > 0) {
      try {
        const url = process.env.REACT_APP_API_URL + `api/boards/`;
        const data = {
          userId: user.id,
          title: boardData.title,
          bgImg: boardData.bgImg,
          bgColor: boardData.bgColor,
        };
        const res = await axios.post(url, data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.add_board_form}>
      <BackgroundSelector
        onChangeBackground={onChangeBackground}
      ></BackgroundSelector>

      <label className={styles.add_board_form__title}>
        <h5>Board title</h5>
        <input
          type="text"
          name="title"
          maxLength={50}
          value={boardData.title}
          onChange={(e) =>
            setBoardData({ ...boardData, title: e.target.value })
          }
        />
        {!boardData.title && <p>👋 Board title is required</p>}
      </label>
      <button onClick={() => handleAddBoard()}>Create</button>
    </div>
  );
};

export default AddBoardForm;
