import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/UserSlice";
import { selectSelectedBoard } from "../../features/board/boardsSlice";

import ProfileIcon from "../profile/ProfileIcon";
import { FaTrello } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const user = useAppSelector(selectUser);
  const selectedBoard = useAppSelector(selectSelectedBoard);

  return (
    <div
      className={`
      ${styles.navbar} 
      ${selectedBoard ? styles.navbar_transparent : styles.navbar_blue}
      `}
    >
      <Link to={"/"} className={styles.icon}>
        <FaTrello></FaTrello>
        Trello
      </Link>
      <div className={styles.links}>
        {user.id && (
          <Link to={"/"} className={styles.link}>
            Boards
          </Link>
        )}
      </div>
      {user.id && <ProfileIcon></ProfileIcon>}

      {/* <div
        className={styles.navbar_wrapper}
        style={{
          backgroundColor: "blue",
          //@ts-ignore
          backgroundImage: `url(/img/${selectedBoard?.bg_img})`,
          //@ts-ignore
          backgroundColor: selectedBoard?.bg_color,
        }}
      ></div> */}
    </div>
  );
};

export default Navbar;
