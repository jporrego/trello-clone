import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/UserSlice";

import ProfileIcon from "../profile/ProfileIcon";
import { FaTrello } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <div className={styles.navbar}>
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
        {/*
        {!user.id && (
          <Link to={"/login"} className={styles.link}>
            Login
          </Link>
        )}*/}
      </div>
      {user.id && <ProfileIcon></ProfileIcon>}
    </div>
  );
};

export default Navbar;
