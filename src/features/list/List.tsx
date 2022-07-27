import React, { useState, useEffect } from "react";
import { List as ListType } from "../../types";
import styles from "./List.module.css";
import { AiOutlinePlus } from "react-icons/ai";

interface ListProps {
  list: ListType;
}
const List: React.FC<ListProps> = ({ list }) => {
  return (
    <div className={styles.list}>
      <div className={styles.title}>{list.name}</div>
      <div className={styles.card}>
        asdj alskdja lskdjal skdj alsdkjalskdjalskdj
      </div>
      <div className={styles.addBtn}>
        <AiOutlinePlus></AiOutlinePlus> Add a card
      </div>
    </div>
  );
};

export default List;
