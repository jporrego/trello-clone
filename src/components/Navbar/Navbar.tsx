import React from "react";
import { Link, useParams } from "react-router-dom";
import ProfileIcon from "../profile/ProfileIcon";
import { FaTrello } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to={"/"} className={styles.icon}>
        <FaTrello></FaTrello>
        Trello
      </Link>
      <div className={styles.links}>
        <Link to={"/"} className={styles.link}>
          Boards
        </Link>
        <Link to={"/login"} className={styles.link}>
          Login
        </Link>
      </div>
      <ProfileIcon></ProfileIcon>
    </div>
  );
};

export default Navbar;
