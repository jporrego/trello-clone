import React from "react";
import { Link, useParams } from "react-router-dom";
import ProfileIcon from "../profile/ProfileIcon";
import { FaTrello } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.icon}>
        <FaTrello></FaTrello>
        Trello
      </div>
      <div className={styles.links}>
        <Link to={"/"}>Boards</Link>
        <Link to={"/login"}>Login</Link>
      </div>
      <ProfileIcon></ProfileIcon>
    </div>
  );
};

export default Navbar;
