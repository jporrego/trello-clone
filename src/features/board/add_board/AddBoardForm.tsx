import React from "react";
import { BackgroundSelector } from "./BackgroundSelector";

const AddBoardForm = () => {
  return (
    <div>
      <BackgroundSelector></BackgroundSelector>
      <div>
        Board title
        <input type="text" />
      </div>
      <button>Create</button>
    </div>
  );
};

export default AddBoardForm;
